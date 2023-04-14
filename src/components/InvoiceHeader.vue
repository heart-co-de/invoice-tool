<template>
  <div class="pt-[45mm] pl-[20mm]">
    <!-- Adresses -->
    <div class="flex justify-between">
      <!-- Letter Window -->
      <div class="w-[85mm] pl-[5mm] mb-[8.46mm]">
        <p class="text-[10px] underline h-[17.7mm] pt-[14.4mm] align-bottom">
          {{ userData.name }} - {{ userData.street }} - {{ userData.zip }} {{ userData.city }}
        </p>
        <p class="h-[27.3mm]">
          {{ customer.name }}
          <br />
          <template v-if="customer.name_additional">
            {{ customer.name_additional }}
            <br />
          </template>
          {{ customer.street }}
          <br />
          {{ customer.zip }} {{ customer.city }}
        </p>
      </div>
      <!-- Company Data -->
      <div class="mr-[20mm] text-right">
        <p class="mb-2">
          <span class="font-bold">{{ userData.company_name }}</span>
          <br />
          (Inh. {{ userData.name }})
          <br />
          {{ userData.street }}
          <br />
          {{ userData.zip }} {{ userData.city }}
        </p>
        <p class="kommunikation">
          <template v-if="userData.tel">
            Tel.: {{ userData.tel }}
            <br />
          </template>
          <template v-if="userData.mobile">
            Mobil: {{ userData.mobile }}
            <br />
          </template>
          <template v-if="userData.email">
            E-Mail: {{ userData.email }}
            <br />
          </template>
        </p>
      </div>
    </div>

    <!-- Titles -->
    <div class="flex justify-between">
      <div class="ml-[5mm]">
        <h1 class="text-xl mb-2">
          Rechnung für
          {{
            formatAsMonthYear(
              new Date(toDateInputString({ month: invoice.for_month, year: invoice.for_year })),
            )
          }}
        </h1>
        <h3 class="text-sm mb-2">Rechnung Nr. {{ invoice.invoice_number }}</h3>
        <p>Bitte bei Zahlungen und Schriftverkehr angeben.</p>
      </div>
      <div class="mr-[20mm] text-right">
        <p>
          Rechnungsdatum: {{ formatAsDate(new Date(invoice.created_at || '')) }}
          <br />
          Kundennummer: {{ customer.id }}
          <br />
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Customer } from '@/api/useCustomer'
import type { Invoice } from '@/api/useInvoice'
import type { UserData } from '@/api/useUserData'
import { formatAsDate, formatAsMonthYear, toDateInputString } from '@/utils/unitHelpers.js'

defineProps<{
  userData: UserData
  invoice: Invoice
  customer: Customer
}>()
</script>
