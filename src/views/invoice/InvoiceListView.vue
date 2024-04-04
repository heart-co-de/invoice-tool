<template>
  <div class="mt-4 overflow-hidden bg-white shadow sm:rounded-md">
    <ul role="list" class="divide-y divide-gray-200">
      <li v-for="invoice in invoiceList" :key="invoice.id">
        <router-link :to="`/invoice/${invoice.id}`" class="block hover:bg-gray-50">
          <div class="flex items-center px-4 py-4 sm:px-6">
            <div class="flex items-center flex-1 min-w-0">
              <div class="flex-shrink-0">
                <UserCircleIcon
                  v-if="!invoice.customer[0].image_url"
                  class="h-12 w-12 text-gray-300"
                  aria-hidden="true"
                />
                <img
                  v-else
                  :src="invoice.customer[0].image_url"
                  alt=""
                  class="h-12 w-12 rounded-full"
                />
              </div>
              <div class="flex-1 min-w-0 px-4 md:grid md:grid-cols-2 md:gap-4">
                <div>
                  <p class="text-sm font-medium text-indigo-600 truncate">
                    {{ invoice.invoice_number }} - {{ invoice.customer[0].name }}
                  </p>
                  <p class="flex items-center mt-2 text-sm text-gray-500">
                    <EnvelopeIcon
                      class="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                      aria-hidden="true"
                    />
                    <span class="truncate">{{ invoice.for_month }}.{{ invoice.for_year }}</span>
                  </p>
                </div>
                <div class="hidden md:block">
                  <div>
                    <p class="text-sm text-gray-900">
                      For Customer: {{ invoice.customer[0].name }}
                    </p>
                    <p class="flex items-center mt-2 text-sm text-gray-500">
                      <CurrencyEuroIcon
                        class="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                        aria-hidden="true"
                      />
                      {{ invoice.total_price }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <ChevronRightIcon class="w-5 h-5 text-gray-400" aria-hidden="true" />
            </div>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useInvoiceList } from '@/api/useInvoice'
import {
  ChevronRightIcon,
  EnvelopeIcon,
  CurrencyEuroIcon,
  UserCircleIcon,
} from '@heroicons/vue/20/solid'

const { data: invoiceList } = useInvoiceList()
</script>
