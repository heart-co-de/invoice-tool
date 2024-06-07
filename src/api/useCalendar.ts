import type { MaybeRef } from '@vueuse/core'
import { useQuery } from 'vue-query'
import { useCustomer } from './useCustomer'
import { computed } from 'vue'
import * as ical from 'ical'
import { supabase } from '@/services/supabase'

export type CalendarEvent = {
  day: number
  month: number
  year: number
  title: string
  durationInHours: number
}

const convertIcalStringToEvents = (icalString: string): CalendarEvent[] => {
  const icalData = ical.parseICS(icalString)
  return Object.entries(icalData)
    .filter(([, event]) => event.type === 'VEVENT')
    .map(([, event]) => {
      const durationInMs = (event.end?.getTime() || 0) - (event.start?.getTime() || 0)
      return {
        day: (event.start?.getDate() || 0) + 1,
        month: (event.start?.getMonth() || 0) + 1,
        year: event.start?.getFullYear() || 0,
        title: event.summary || '',
        durationInHours: durationInMs / 1000 / 60 / 60,
      }
    })
}

const mergeDuplicateEvents = (events: CalendarEvent[]): CalendarEvent[] => {
  return events.reduce((acc, event) => {
    const existingEvent = acc.find(
      (e) =>
        e.day === event.day &&
        e.month === event.month &&
        e.year === event.year &&
        e.title === event.title,
    )
    if (existingEvent) {
      existingEvent.durationInHours += event.durationInHours
    } else {
      acc.push(event)
    }
    return acc
  }, [] as CalendarEvent[])
}

export const fetchCalendarEvents = async (url: string) => {
  const { data: icalString, error } = await supabase.functions.invoke('cors-proxy', {
    body: {
      url,
    },
  })
  if (error) throw error
  return mergeDuplicateEvents(convertIcalStringToEvents(icalString))
}

export const useCalendarQuery = (customerId: MaybeRef<number | undefined>) => {
  const { data: customerData } = useCustomer(customerId)
  return useQuery({
    queryKey: ['calendar', customerId],
    enabled: computed(() => !!customerData.value?.ical_url),
    queryFn: async () => {
      if (!customerData.value?.ical_url) throw new Error('No calendar URL')
      return fetchCalendarEvents(customerData.value.ical_url)
    },
  })
}
