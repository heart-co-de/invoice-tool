<template>
  <div v-if="isLoading">Loading...</div>
  <div v-else-if="isError">Error: {{ error }}</div>
  <form @submit.prevent="updateUser" class="space-y-6">
    <BaseInput name="Name" type="text" v-model="updateUserForm.name" />
    <BaseInput name="Company Name" type="text" v-model="updateUserForm.company_name" />
    <BaseInput name="Email" type="text" v-model="updateUserForm.email" />
    <BaseInput name="Street" type="text" v-model="updateUserForm.street" />
    <div class="grid-cols-4 sm:space-x-2 sm:grid spa">
      <BaseInput name="Zip" type="text" v-model="updateUserForm.zip" />
      <BaseInput name="City" type="text" v-model="updateUserForm.city" class="col-span-3" />
    </div>
    <BaseInput name="Mobile" type="text" v-model="updateUserForm.mobile" />
    <BaseInput name="Tel" type="text" v-model="updateUserForm.tel" />
    <BaseInput
      name="Bank Account Holder"
      type="text"
      v-model="updateUserForm.bank_account_holder"
    />
    <BaseInput name="Bank Iban" type="text" v-model="updateUserForm.bank_iban" />
    <BaseInput name="Bank Name" type="text" v-model="updateUserForm.bank_name" />
    <BaseInput name="Bank Bic" type="text" v-model="updateUserForm.bank_bic" />
    <BaseInput name="Tax Id" type="text" v-model="updateUserForm.tax_id" />
    <BaseInput name="Tax Office" type="text" v-model="updateUserForm.tax_office" />
    <BaseInput name="No Sales Tax" type="checkbox" v-model="updateUserForm.no_sales_tax" />

    <button
      type="submit"
      class="flex justify-center w-full px-3 py-2 mx-auto text-sm font-semibold text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    >
      Save
    </button>
  </form>
</template>

<script setup lang="ts">
import { useUpdateUserData, useUserData, type UpdateUserData } from '@/api/useUserData'
import BaseInput from '@/components/BaseInput.vue'
import { reactive } from 'vue'
import { onceTruthy } from '../utils/onceTruthy'

const updateUserForm = reactive<UpdateUserData>({
  bank_account_holder: '',
  bank_bic: '',
  bank_iban: '',
  bank_name: '',
  city: '',
  company_name: '',
  email: '',
  mobile: '',
  name: '',
  no_sales_tax: true,
  street: '',
  tax_id: '',
  tax_office: '',
  tel: '',
  zip: '',
})
const { data: userData, isError, isLoading, error } = useUserData()
onceTruthy(userData, () => {
  Object.assign(updateUserForm, userData.value)
})

const { mutate } = useUpdateUserData()
const updateUser = () => {
  mutate(updateUserForm)
}
</script>
