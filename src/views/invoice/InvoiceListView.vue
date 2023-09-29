<template>
  <div class="mt-4 overflow-hidden bg-white shadow sm:rounded-md">
    <ul role="list" class="divide-y divide-gray-200">
      <li v-for="invoice in invoiceList" :key="invoice.id">
        <router-link :to="`/invoice/${invoice.id}`" class="block hover:bg-gray-50">
          <div class="flex items-center px-4 py-4 sm:px-6">
            <div class="flex items-center flex-1 min-w-0">
              <div class="flex-shrink-0">
                <img
                  class="w-12 h-12 rounded-full"
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
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
import { ChevronRightIcon, EnvelopeIcon, CurrencyEuroIcon } from '@heroicons/vue/20/solid'

const { data: invoiceList } = useInvoiceList()
</script>
