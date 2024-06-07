import { queryClient } from '@/plugins/vueQuery'
import { supabase } from '@/services/supabase'
import type { MakeOptional } from '@/utils/MakeOptional'
import type { MaybeRef } from '@vueuse/core'
import { omit, uniqWith } from 'lodash'
import { computed, unref } from 'vue'
import { useMutation, useQuery } from 'vue-query'
import { getUserId } from './utils'
import { fetchCalendarEvents } from './useCalendar'

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

export const useCustomerListWithPendingInvoice = () => {
  return useQuery(['customer', 'pendingInvoice'], async () => {
    const { data, error } = await supabase
      .from('customer')
      .select(
        ` *,
          invoice (
            *
          )`,
      )
      .order('created_at', { ascending: false })
    if (error) throw error

    const customersWithCalendarAndLastInvoice = data
      .filter((c) => c.ical_url)
      .filter((c) => c.invoice)
      .map((c) => ({
        ...c,
        lastInvoice: [c.invoice!]
          .flat()
          .sort((a, b) => (a.invoice_number < b.invoice_number ? 1 : -1))[0],
      }))

    const customersWithPendingInvoice = customersWithCalendarAndLastInvoice.filter((c) => {
      const lastInvoiceMonth = c.lastInvoice.for_month
      const lastInvoiceYear = c.lastInvoice.for_year
      const currentMonth = new Date().getMonth() + 1
      const currentYear = new Date().getFullYear()
      return lastInvoiceMonth < currentMonth || lastInvoiceYear < currentYear
    })

    const customersWithPendingCalendarEvents = await Promise.all(
      customersWithPendingInvoice.map(async (c) => ({
        ...c,
        pendingCalendarEvents: (
          await fetchCalendarEvents(c.ical_url!)
        ).filter((e) => {
          const latestMonth = c.lastInvoice.for_month
          const latestYear = c.lastInvoice.for_year
          const result = e.year > latestYear || (e.month > latestMonth && e.year === latestYear)
          return result
        }),
      })),
    )

    return customersWithPendingCalendarEvents
      .filter((c) => c.pendingCalendarEvents.length > 0)
      .map((c) => ({
        ...c,
        pendingMonths: uniqWith(
          c.pendingCalendarEvents
            .map((e) => ({ month: e.month, year: e.year }))
            .filter(
              (e) => e.year !== new Date().getFullYear() || e.month !== new Date().getMonth() + 1,
            ),
          (a, b) => {
            return a.month === b.month && a.year === b.year
          },
        ),
      }))
      .filter((c) => c.pendingMonths.length > 0)
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
