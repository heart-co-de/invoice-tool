<template>
  <InvoiceMain
    v-if="invoiceData && userData && customerData"
    :invoice="invoiceData"
    :customer="customerData"
    :user-data="userData"
  />
</template>

<script setup lang="ts">
import { useCustomer } from '@/api/useCustomer'
import { useInvoice } from '@/api/useInvoice'
import { useUserData } from '@/api/useUserData'
import InvoiceMain from '@/components/InvoiceMain.vue'
import { computed, toRefs } from 'vue'

const props = defineProps<{ invoiceId: number }>()

const { invoiceId } = toRefs(props)

const { data: invoiceData } = useInvoice(invoiceId)
const { data: customerData } = useCustomer(computed(() => invoiceData.value?.customer_id))
const { data: userData } = useUserData()
</script>
