<template>
  <div class="ml-[25mm] mr-[20mm] h-[135mm]">
    <div class="tabelle-leistungen">
      <table class="w-full mt-4">
        <thead>
          <tr class="[&_th]:font-[400] text-left bg-slate-200">
            <th class="w-[20px] pr-1 text-right">#</th>
            <th class="w-24">Leistungsdatum</th>
            <th class="beschreibung">Beschreibung</th>
            <th class="w-[70px] text-center pr-2">Menge</th>
            <th class="w-[97px]">Preis pro Einheit</th>
            <th class="w-[50px] text-right">Betrag</th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="[&:nth-child(2n+1)]:bg-slate-50"
            v-for="(position, count) in invoice.invoice_position"
            :key="position.id"
          >
            <td>
              <span class="text-right block pr-1">{{ count + 1 }}</span>
            </td>
            <td>
              <span class="text-center block">
                {{ formatAsDate(new Date(position.service_date)) }}
              </span>
            </td>
            <td class="pr-2">
              <span class="">{{ position.description }}</span>
            </td>
            <td>
              <span class="text-right block pr-2">
                {{ position.quantity }} {{ position.unit_quantity }}n
              </span>
            </td>
            <td>
              <span class="">
                {{ formatAsEuro(position.price_per_quantity) }}/{{ position.unit_quantity }}
              </span>
            </td>
            <td>
              <span class="text-right block">{{ formatAsEuro(position.price) }}</span>
            </td>
          </tr>
          <tr class="[&_td]:pt-[3mm]">
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td><span class="font-bold">Summe</span></td>
            <td>
              <span class="block text-right font-bold">
                {{
                  formatAsEuro(
                    invoice.invoice_position.reduce(
                      (currentSum, position) => currentSum + position.price,
                      0,
                    ) || 0,
                  )
                }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-if="userData.no_sales_tax" class="mt-2">
      <p>Es wird gemäß §19 Abs. 1 Umsatzsteuergesetz keine Umsatzsteuer erhoben.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Invoice } from '@/api/useInvoice'
import type { UserData } from '@/api/useUserData'
import { formatAsDate, formatAsEuro } from '@/utils/unitHelpers'

defineProps<{
  userData: UserData
  invoice: Invoice
}>()
</script>
