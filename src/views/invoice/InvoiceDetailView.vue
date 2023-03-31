<template>
  <div v-if="isLoading">Loading...</div>
  <div v-else-if="isError">Error: {{ error }}</div>
  <form @submit.prevent="updateUser" class="space-y-6">
    <CustomerDropdown v-model="updateInvoiceForm.customer_id" />
    <BaseInput
      name="Invoice Number"
      type="number"
      min="0"
      v-model="updateInvoiceForm.invoice_number"
    />
    <BaseInput name="For Month" type="date" v-model="dateForDatepicker" />

    <button
      type="submit"
      class="flex justify-center w-full px-3 py-2 mx-auto text-sm font-semibold text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    >
      Save
    </button>
  </form>
</template>

<script setup lang="ts">
import { useInvoice, useUpdateInvoice, type UpdateInvoice } from '@/api/useInvoice'
import BaseInput from '@/components/BaseInput.vue'
import CustomerDropdown from '@/components/CustomerDropdown.vue'
import { toDateInputString } from '@/utils/dateTimeHelpers'
import { omit } from 'lodash'
import { computed, reactive, toRefs } from 'vue'
import { onceTruthy } from '../../utils/onceTruthy'

const props = defineProps<{
  invoiceId?: number
}>()

const { invoiceId } = toRefs(props)

const updateInvoiceForm = reactive({
  id: invoiceId,
  customer_id: 0,
  for_month: 0,
  for_year: 0,
  invoice_number: 0,
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
const { data: invoiceData, isError, isLoading, error } = useInvoice(invoiceId)
onceTruthy(invoiceData, () => {
  Object.assign(updateInvoiceForm, omit(invoiceData.value, 'id'))
})

const { mutate } = useUpdateInvoice()
const updateUser = () => {
  mutate(updateInvoiceForm)
}
</script>
