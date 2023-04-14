<template>
  <InvoicePageContainer>
    <InvoiceHeader v-bind="props" />
    <InvoiceBody v-bind="props" />
    <InvoiceFooter v-bind="props" />
  </InvoicePageContainer>
</template>

<script setup lang="ts">
import type { Customer } from '@/api/useCustomer'
import type { Invoice } from '@/api/useInvoice'
import type { UserData } from '@/api/useUserData'
import InvoiceHeader from './InvoiceHeader.vue'
import InvoiceBody from './InvoiceBody.vue'
import InvoiceFooter from './InvoiceFooter.vue'
import InvoicePageContainer from './InvoicePageContainer.vue'

const props = defineProps<{
  userData: UserData
  invoice: Invoice
  customer: Customer
}>()
</script>
