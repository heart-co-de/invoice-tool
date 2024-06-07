<script setup lang="ts">
import { useCustomerListWithPendingInvoice } from '@/api/useCustomer'
import CustomerListItem from './customer/CustomerListItem.vue'
import { formatAsMonthYear, toDateInputString } from '@/utils/unitHelpers'

const { data: customersWithPendingInvoices } = useCustomerListWithPendingInvoice()
</script>

<template>
  <template v-if="customersWithPendingInvoices?.length">
    <h2 class="mt-6 text-xl font-bold tracking-tight text-gray-900">Pending Invoices</h2>
    <div class="mt-4 overflow-hidden bg-white shadow sm:rounded-md">
      <ul role="list" class="divide-y divide-gray-200">
        <template v-for="customer in customersWithPendingInvoices">
          <li
            v-for="pendingMonthData in customer.pendingMonths"
            :key="`${customer.id}-${pendingMonthData.year}-${pendingMonthData.month}`"
          >
            <router-link
              :to="`/invoice/new?customer_id=${customer.id}&for_month=${pendingMonthData.month}&for_year=${pendingMonthData.year}`"
              class="block hover:bg-gray-50"
            >
              <CustomerListItem :customer="customer">
                Pending Month:
                {{ formatAsMonthYear(new Date(toDateInputString(pendingMonthData))) }}
              </CustomerListItem>
            </router-link>
          </li>
        </template>
      </ul>
    </div>
  </template>
</template>
