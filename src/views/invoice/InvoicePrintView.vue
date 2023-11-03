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
import { computed, onBeforeUnmount, toRefs, watch } from 'vue'
import { useTitle } from '@vueuse/core'

const props = defineProps<{ invoiceId: number }>()

const { invoiceId } = toRefs(props)

const { data: invoiceData } = useInvoice(invoiceId)
const { data: customerData } = useCustomer(computed(() => invoiceData.value?.customer_id))
const { data: userData } = useUserData()

const titleText = computed(() => {
  if (!invoiceData.value || !customerData.value) return ''
  return `${invoiceData.value.invoice_number} - ${customerData.value.name}`
})

const title = useTitle()
const formerTitle = title.value || ''
onBeforeUnmount(() => {
  const titleTag = document.querySelector('title')
  if (!titleTag) return
  titleTag.textContent = formerTitle
})
watch(
  titleText,
  () => {
    title.value = titleText.value
  },
  { immediate: true },
)
</script>
