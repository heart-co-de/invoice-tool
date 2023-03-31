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
      const { data, error } = await supabase.from('invoice').select('*').eq('id', unref(invoiceId))
      if (error) throw error
      return data[0]
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
export type UpdateInvoice = MakeOptional<Omit<Invoice, 'user_id' | 'created_at'>, 'id'>

export const useUpdateInvoice = () => {
  return useMutation(
    async (invoice: UpdateInvoice) => {
      const userId = await getUserId()
      return supabase
        .from('invoice')
        .upsert({
          ...(invoice.id ? invoice : omit(invoice, 'id')),
          user_id: userId,
        })
        .select()
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
