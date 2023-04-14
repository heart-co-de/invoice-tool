import { queryClient } from '@/plugins/vueQuery'
import { supabase } from '@/services/supabase'
import type { MakeOptional } from '@/utils/MakeOptional'
import type { MaybeRef } from '@vueuse/core'
import { omit } from 'lodash'
import { computed, unref } from 'vue'
import { useMutation, useQuery } from 'vue-query'
import { getUserId } from './utils'

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
          )
        `,
        )
        .eq('id', unref(invoiceId))
      if (error) throw error
      return {
        ...data[0],
        invoice_position:
          data[0].invoice_position && 'length' in data[0].invoice_position
            ? data[0].invoice_position.sort(
                (a, b) =>
                  (new Date(a.service_date) as unknown as number) -
                  (new Date(b.service_date) as unknown as number),
              )
            : [],
      }
    },
    {
      enabled: computed(() => !!unref(invoiceId)),
    },
  )
}

export const useInvoiceList = () => {
  return useQuery('invoice', async () => {
    const { data, error } = await supabase.from('invoice').select('*')
    if (error) throw error
    return data
  })
}

export type Invoice = NonNullable<ReturnType<typeof useInvoice>['data']['value']>
export type UpdateInvoice = MakeOptional<
  Omit<Invoice, 'user_id' | 'created_at' | 'invoice_position'>,
  'id'
> & { invoice_position: InvoicePosition[] }
export type InvoicePosition = MakeOptional<
  NonNullable<Invoice['invoice_position'][number]>,
  'id' | 'created_at' | 'invoice_id' | 'user_id'
>

export const useUpdateInvoice = () => {
  return useMutation(
    async (invoice: UpdateInvoice) => {
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
