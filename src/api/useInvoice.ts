import { queryClient } from '@/plugins/vueQuery'
import { supabase } from '@/services/supabase'
import type { MaybeRef } from '@vueuse/core'
import { omit } from 'lodash'
import { computed, unref } from 'vue'
import { useMutation, useQuery } from 'vue-query'
import { getUserId } from './utils'
import { unitQuantitySchema } from '@/utils/unitHelpers'
import { z } from 'zod'

type MaybeArray<T> = T | T[]
type UnArray<T> = T extends (infer U)[] ? U : T

const arrayify = <T>(value: MaybeArray<T> | null) =>
  Array.isArray(value) ? value : value == null ? [] : [value]

const arrayifyProps = <TObj extends Record<string, unknown>, TKey extends keyof TObj>(
  obj: TObj,
  keys: TKey[],
) =>
  keys.reduce((obj, key) => ({ ...obj, [key]: arrayify(obj[key]) }), obj) as TObj & {
    [key in TKey]: UnArray<NonNullable<TObj[key]>>[]
  }

const mapInvoice = <
  TInvoice extends {
    invoice_position: MaybeArray<{
      unit_quantity: string
      service_date: string
      price: number
    }> | null
    customer: MaybeArray<unknown> | null
  },
>(
  _invoice: TInvoice,
) => {
  type InvoicePosition = Array<UnArray<NonNullable<TInvoice['invoice_position']>>>
  const invoice = arrayifyProps(_invoice, ['invoice_position', 'customer'])
  const invoicePosition: InvoicePosition = invoice.invoice_position
  return {
    ...invoice,
    total_price: invoicePosition.reduce((sum, position) => sum + position.price, 0),
    invoice_position: invoicePosition
      .sort(
        (a, b) =>
          (new Date(a.service_date) as unknown as number) -
          (new Date(b.service_date) as unknown as number),
      )
      .map((position) => ({
        ...position,
        unit_quantity: unitQuantitySchema.safeParse(position.unit_quantity).success
          ? unitQuantitySchema.parse(position.unit_quantity)
          : 'Stunde',
      })),
  }
}

export const useNextInvoiceNumber = () => {
  const invoiceListQuery = useInvoiceList()

  const nextInvoiceNumber = computed(() => {
    const invoiceList = invoiceListQuery.data?.value ?? []
    const lastInvoiceNumber = Math.max(...invoiceList.map((invoice) => invoice.invoice_number))
    return lastInvoiceNumber + 1
  })

  return {
    nextInvoiceNumber,
    ...invoiceListQuery,
  }
}

export const useInvoice = (invoiceId: MaybeRef<number | undefined>) => {
  return useQuery(
    ['invoice', invoiceId],
    async () => {
      const { data, error } = await supabase
        .from('invoice')
        .select(
          `
          *,
          invoice_position (
            *
          ),
          customer (
            *
          )
        `,
        )
        .eq('id', unref(invoiceId))
      if (error) throw error
      return mapInvoice(data[0])
    },
    {
      enabled: computed(() => !!unref(invoiceId)),
    },
  )
}

export const useInvoiceList = () => {
  return useQuery('invoice', async () => {
    const { data, error } = await supabase
      .from('invoice')
      .select(
        `
      *,
      invoice_position (
        *
      ),
      customer (
        *
      )
    `,
      )
      .order('invoice_number', { ascending: false })
    if (error) throw error
    return data.map(mapInvoice)
  })
}

export type Invoice = NonNullable<ReturnType<typeof useInvoice>['data']['value']>

const InvoicePositionSchema = z.object({
  description: z.string(),
  price: z.number(),
  price_per_quantity: z.number(),
  quantity: z.number(),
  service_date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format, should be YYYY-MM-DD'),
  unit_quantity: unitQuantitySchema,
  created_at: z.string().nullable().optional(),
  id: z.number().optional(),
  user_id: z.string().optional(),
  invoice_id: z.number().optional(),
})

export const UpdateInvoiceSchema = z.object({
  invoice_number: z.number(),
  customer_id: z.number(),
  for_month: z.number(),
  for_year: z.number(),
  id: z.number().optional(),
  invoice_position: z.array(InvoicePositionSchema),
})

export type UpdateInvoice = z.infer<typeof UpdateInvoiceSchema>
export type InvoicePosition = z.infer<typeof InvoicePositionSchema>

export const useUpdateInvoice = () => {
  return useMutation(
    async (invoiceData: UpdateInvoice) => {
      console.log({ invoiceData })
      const invoice = UpdateInvoiceSchema.parse(invoiceData)
      const userId = await getUserId()
      const invoiceWithoutPositions = omit(invoice, 'invoice_position')
      const { data, error: invoiceError } = await supabase
        .from('invoice')
        .upsert({
          ...(invoiceWithoutPositions.id
            ? invoiceWithoutPositions
            : omit(invoiceWithoutPositions, 'id')),
          user_id: userId,
        })
        .select('id')
      if (invoiceError) throw invoiceError

      const [{ id: invoiceId }] = data
      const invoicePositions = invoice.invoice_position.map((p) => ({
        ...p,
        user_id: userId,
        invoice_id: invoiceId,
      }))

      const invoicePositionsToUpdate = invoicePositions.filter((p) => !!p.id)
      const { error: invoicePositionsUpdateError } = await supabase
        .from('invoice_position')
        .upsert(invoicePositionsToUpdate)
      if (invoicePositionsUpdateError) throw invoicePositionsUpdateError

      const invoicePositionsToInsert = invoicePositions.filter((p) => !p.id)
      const { error: invoicePositionsInsertError } = await supabase
        .from('invoice_position')
        .insert(invoicePositionsToInsert)
      if (invoicePositionsInsertError) throw invoicePositionsInsertError

      return { invoiceId }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: 'invoice',
        })
      },
    },
  )
}
