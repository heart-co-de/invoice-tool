<template>
  <div v-if="isLoading">Loading...</div>
  <div v-else-if="isError">Error: {{ error }}</div>
  <form @submit.prevent="updateInvoice" class="space-y-6">
    <DropdownCustomer v-model="updateInvoiceForm.customer_id" />
    <BaseInput
      name="Invoice Number"
      type="number"
      min="0"
      v-model="updateInvoiceForm.invoice_number"
    />
    <BaseInput name="For Month" type="date" v-model="dateForDatepicker" />

    <InvoicePositionTable @create-position="createInvoicePosition">
      <InvoicePositionItem
        v-for="(invoicePosition, index) in updateInvoiceForm.invoice_position"
        :key="index"
        :invoice-position="invoicePosition"
        :is-initially-in-edit-mode="!invoicePosition.description && !invoicePosition.quantity"
        @update:invoice-position="updateInvoicePosition({ index, invoicePosition: $event })"
      />
    </InvoicePositionTable>

    <div class="grid grid-cols-2 space-x-2">
      <BaseButton type="submit">Save {{ isSubmitting ? '...' : '' }}</BaseButton>
      <BaseButton :disabled="!canGoToPrint" @click="goToPrint">Print</BaseButton>
    </div>
  </form>
  <InvoiceCalendarList
    class="mt-6"
    :customerId="updateInvoiceForm.customer_id"
    :month="updateInvoiceForm.for_month"
    :year="updateInvoiceForm.for_year"
    @importCalendarEvents="addCalendarEventsToInvoicePositions($event)"
  />
</template>

<script setup lang="ts">
import { useCustomer } from '@/api/useCustomer'
import {
  useInvoice,
  useUpdateInvoice,
  type InvoicePosition,
  type UpdateInvoice,
  useNextInvoiceNumber,
} from '@/api/useInvoice'
import BaseButton from '@/components/BaseButton.vue'
import BaseInput from '@/components/BaseInput.vue'
import DropdownCustomer from '@/components/DropdownCustomer.vue'
import { toDateInputString } from '@/utils/unitHelpers'
import { omit } from 'lodash'
import { computed, reactive, toRefs } from 'vue'
import { onceTruthy } from '../../utils/onceTruthy'
import InvoicePositionItem from './InvoicePositionItem.vue'
import InvoicePositionTable from './InvoicePositionTable.vue'
import { useRoute, useRouter } from 'vue-router'
import InvoiceCalendarList from './InvoiceCalendarList.vue'
import type { CalendarEvent } from '@/api/useCalendar'

const props = defineProps<{
  invoiceId?: number
}>()

const { invoiceId } = toRefs(props)

// Form

const route = useRoute()
const { query } = route

const updateInvoiceForm = reactive({
  id: invoiceId?.value || 0,
  customer_id: Number(query.customer_id) || 0,
  for_month: Number(query.for_month) || 0,
  for_year: Number(query.for_year) || 0,
  invoice_number: 0,
  invoice_position: [] as InvoicePosition[],
}) satisfies UpdateInvoice

const dateForDatepicker = computed({
  get: (): string => {
    return toDateInputString({
      year: updateInvoiceForm.for_year,
      month: updateInvoiceForm.for_month,
    })
  },
  set: (newDate: string) => {
    const [year, month] = newDate.split('-')
    if (year.length < 4) return
    updateInvoiceForm.for_year = Number(year)
    updateInvoiceForm.for_month = Number(month)
  },
})

const { data: customer } = useCustomer(computed(() => updateInvoiceForm.customer_id))

// Form: Invoice Positions

const createInvoicePosition = () => {
  updateInvoiceForm.invoice_position = [
    ...updateInvoiceForm.invoice_position,
    {
      service_date: new Date(updateInvoiceForm.for_year, updateInvoiceForm.for_month, 1)
        .toISOString()
        .slice(0, 10),
      description: '',
      quantity: 0,
      unit_quantity: 'Stunde',
      price_per_quantity: customer.value?.default_price_per_hour || 0,
      price: 0,
    },
  ]
}

const updateInvoicePosition = ({
  index,
  invoicePosition,
}: {
  index: number
  invoicePosition: InvoicePosition
}) => {
  updateInvoiceForm.invoice_position = [
    ...updateInvoiceForm.invoice_position.slice(0, index),
    invoicePosition,
    ...updateInvoiceForm.invoice_position.slice(index + 1),
  ]
}

// Data Fetching

const { data: invoiceData, isError, isLoading: isLoadingInvoice, error } = useInvoice(invoiceId)
onceTruthy(invoiceData, () => {
  Object.assign(updateInvoiceForm, omit(invoiceData.value, 'id'))
})

const { nextInvoiceNumber, isLoading: isLoadingNextInvoiceNumber } = useNextInvoiceNumber()
const finalInvoiceNumber = computed(() => {
  if (invoiceId?.value) return invoiceData.value?.invoice_number
  return nextInvoiceNumber.value
})
onceTruthy(finalInvoiceNumber, (finalInvoiceNumber) => {
  updateInvoiceForm.invoice_number = finalInvoiceNumber
})

const isLoading = computed(() => isLoadingInvoice.value || isLoadingNextInvoiceNumber.value)

// Import Calendar Events

const addCalendarEventsToInvoicePositions = (calendarEvents: CalendarEvent[]) => {
  updateInvoiceForm.invoice_position = [
    ...updateInvoiceForm.invoice_position,
    ...calendarEvents.map(
      (calendarEvent) =>
        ({
          service_date: new Date(calendarEvent.year, calendarEvent.month - 1, calendarEvent.day)
            .toISOString()
            .slice(0, 10),
          description: calendarEvent.title,
          quantity: calendarEvent.durationInHours,
          unit_quantity: 'Stunde',
          price_per_quantity: customer.value?.default_price_per_hour || 0,
          price: calendarEvent.durationInHours * (customer.value?.default_price_per_hour || 0),
        } satisfies InvoicePosition),
    ),
  ]
}

// Data Sending

const { mutateAsync, isLoading: isSubmitting } = useUpdateInvoice()
const updateInvoice = async () => {
  const result = await mutateAsync(updateInvoiceForm)
  if (!invoiceId?.value) router.replace(`/invoice/${result.invoiceId}`)
}

// Navigation
const router = useRouter()
const canGoToPrint = computed(() => !!invoiceId?.value)
const goToPrint = () => {
  if (!canGoToPrint.value) return
  router.push(`/invoice/${invoiceId?.value}/print`)
}
</script>
