<template>
  <div class="flow-root mt-8">
    <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
        <table class="min-w-full divide-y divide-gray-300">
          <thead>
            <tr>
              <th
                scope="col"
                class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
              >
                Service Date
              </th>
              <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                Description
              </th>
              <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                Quantity
              </th>
              <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                Unit Quantity
              </th>
              <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                Price per Quantity
              </th>
              <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                Price
              </th>
              <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-0">
                <span class="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <slot />
          </tbody>
        </table>
        <BaseButton class="ml-auto" @click.prevent="$emit('createPosition')">
          New Invoice Position
        </BaseButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseButton from '@/components/BaseButton.vue'

defineEmits<{
  (e: 'createPosition'): void
}>()
</script>
