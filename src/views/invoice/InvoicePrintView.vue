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
import { computed, toRefs, watch } from 'vue'
import { useTitle } from '@vueuse/core'

const props = defineProps<{ invoiceId: number }>()

const { invoiceId } = toRefs(props)

const { data: invoiceData } = useInvoice(invoiceId)
const { data: customerData } = useCustomer(computed(() => invoiceData.value?.customer_id))
const { data: userData } = useUserData()

const title = useTitle()
watch(
  invoiceData,
  () => {
    title.value = `${invoiceData.value?.invoice_number} - ${customerData.value?.name}`
  },
  { immediate: true },
)
</script>
