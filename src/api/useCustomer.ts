import { queryClient } from '@/plugins/vueQuery'
import { supabase } from '@/services/supabase'
import type { MakeOptional } from '@/utils/MakeOptional'
import type { MaybeRef } from '@vueuse/core'
import { omit } from 'lodash'
import { computed, unref } from 'vue'
import { useMutation, useQuery } from 'vue-query'
import { getUserId } from './utils'

export const useCustomer = (customerId: MaybeRef<number | undefined>) => {
  return useQuery(
    ['customer', customerId],
    async () => {
      const { data, error } = await supabase
        .from('customer')
        .select('*')
        .eq('id', unref(customerId))
      if (error) throw error
      return {
        ...data[0],
        image_url: data[0]?.image_url || '',
      }
    },
    {
      enabled: computed(() => !!unref(customerId)),
    },
  )
}

export const useCustomerList = () => {
  return useQuery('customer', async () => {
    const { data, error } = await supabase
      .from('customer')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) throw error
    return data
  })
}

export type Customer = NonNullable<ReturnType<typeof useCustomer>['data']['value']>
export type UpdateCustomer = MakeOptional<Omit<Customer, 'user_id' | 'created_at'>, 'id'>

export const useUpdateCustomer = () => {
  return useMutation(
    async (customer: UpdateCustomer) => {
      const userId = await getUserId()
      return supabase
        .from('customer')
        .upsert({
          ...(customer.id ? customer : omit(customer, 'id')),
          user_id: userId,
        })
        .select()
    },
    {
      onSuccess: (_data, _variables, _context) => {
        queryClient.invalidateQueries({
          queryKey: 'customer',
        })
      },
    },
  )
}
