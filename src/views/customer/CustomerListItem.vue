<template>
  <div class="flex items-center px-4 py-4 sm:px-6">
    <div class="flex items-center flex-1 min-w-0">
      <div class="flex-shrink-0">
        <UserCircleIcon
          v-if="!customer.image_url"
          class="h-12 w-12 text-gray-300"
          aria-hidden="true"
        />
        <img v-else :src="customer.image_url" alt="" class="h-12 w-12 rounded-full" />
      </div>
      <div class="flex-1 min-w-0 px-4 md:grid md:grid-cols-2 md:gap-4">
        <div>
          <p class="text-sm font-medium text-indigo-600 truncate">
            {{ customer.name }}
          </p>
          <p class="flex items-center mt-2 text-sm text-gray-500">
            <EnvelopeIcon class="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
            <span class="truncate">{{ getAddressInOneLine(customer) }}</span>
          </p>
        </div>
        <div class="hidden md:block">
          <div>
            <p class="text-sm text-gray-900">
              <slot />
            </p>
            <p class="flex items-center mt-2 text-sm text-gray-500">
              <CurrencyEuroIcon
                class="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                aria-hidden="true"
              />
              {{ customer.default_price_per_hour }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <div>
      <ChevronRightIcon class="w-5 h-5 text-gray-400" aria-hidden="true" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { useCustomerList } from '@/api/useCustomer'
import { getAddressInOneLine } from '@/utils/addressHelpers'
import {
  ChevronRightIcon,
  EnvelopeIcon,
  CurrencyEuroIcon,
  UserCircleIcon,
} from '@heroicons/vue/20/solid'

defineProps<{
  customer: NonNullable<ReturnType<typeof useCustomerList>['data']['value']>[number]
}>()
</script>
