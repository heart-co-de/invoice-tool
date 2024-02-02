<template>
  <div v-if="isLoading">Loading...</div>
  <div v-else-if="isError">Error: {{ error }}</div>
  <form @submit.prevent="updateCustomer" class="space-y-6">
    <BaseInput name="Name" type="text" v-model="updateCustomerForm.name" />
    <BaseInput name="Additional Name" type="text" v-model="updateCustomerForm.name_additional" />
    <BaseInput name="Street" type="text" v-model="updateCustomerForm.street" />
    <div class="grid-cols-4 sm:space-x-2 sm:grid">
      <BaseInput name="Zip" type="text" v-model="updateCustomerForm.zip" />
      <BaseInput name="City" type="text" v-model="updateCustomerForm.city" class="col-span-3" />
    </div>
    <BaseInput
      name="Default Price Per Hour"
      type="number"
      min="0"
      v-model="updateCustomerForm.default_price_per_hour"
    />

    <button
      type="submit"
      class="flex justify-center w-full px-3 py-2 mx-auto text-sm font-semibold text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    >
      Save
    </button>
  </form>
</template>

<script setup lang="ts">
import { useCustomer, useUpdateCustomer, type UpdateCustomer } from '@/api/useCustomer'
import BaseInput from '@/components/BaseInput.vue'
import { omit } from 'lodash'
import { reactive, toRefs } from 'vue'
import { onceTruthy } from '../../utils/onceTruthy'

const props = defineProps<{
  customerId?: number
}>()

const { customerId } = toRefs(props)

const updateCustomerForm = reactive({
  id: customerId,
  name: '',
  name_additional: '',
  street: '',
  zip: '',
  city: '',
  default_price_per_hour: 0,
  ical_url: '',
}) satisfies UpdateCustomer
const { data: customerData, isError, isLoading, error } = useCustomer(customerId)
onceTruthy(customerData, () => {
  Object.assign(updateCustomerForm, omit(customerData.value, 'id'))
})

const { mutate } = useUpdateCustomer()
const updateCustomer = () => {
  mutate(updateCustomerForm)
}
</script>
