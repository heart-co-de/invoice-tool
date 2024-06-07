<template>
  <div class="mt-4 overflow-hidden bg-white shadow sm:rounded-md">
    <ul role="list" class="divide-y divide-gray-200">
      <li v-for="customer in customerList" :key="customer.id">
        <router-link :to="`/customer/${customer.id}`" class="block hover:bg-gray-50">
          <CustomerListItem :customer="customer">
            Created At
            {{ ' ' }}
            <time :datetime="customer.created_at || undefined">
              {{ customer.created_at }}
            </time>
          </CustomerListItem>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useCustomerList } from '@/api/useCustomer'
import CustomerListItem from './CustomerListItem.vue'

const { data: customerList } = useCustomerList()
</script>
