<template>
  <div>
    <h2 class="mt-6 text-xl font-bold tracking-tight text-gray-900">Import Invoices JSON</h2>
    <div class="mt-4">
      <input type="file" accept=".json" @change="handleFileUpload" class="w-full" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { z } from 'zod'
import { useUpdateInvoice, UpdateInvoiceSchema } from '../../api/useInvoice'

const UpdateInvoicesSchema = z.array(UpdateInvoiceSchema)

const { mutateAsync } = useUpdateInvoice()

const addInvoices = async (invoicesData: unknown) => {
  const invoices = UpdateInvoicesSchema.parse(invoicesData)
  for (const invoice of invoices) {
    await mutateAsync(invoice)
  }
}

const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (!file) return

  const reader = new FileReader()
  reader.onload = (e) => {
    const content = e.target?.result as string
    try {
      const data = JSON.parse(content)
      addInvoices(data)
    } catch (error) {
      console.error(error)
    }
  }
  reader.readAsText(file)
}
</script>
