<template>
  <Combobox as="div" v-model="selectedCustomer">
    <ComboboxLabel class="block text-sm font-medium leading-6 text-gray-900">
      Customer
    </ComboboxLabel>
    <div class="relative mt-2">
      <ComboboxInput
        class="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        @change="query = $event.target.value"
        :display-value="(customer: Customer) => customer.name"
      />
      <ComboboxButton
        class="absolute inset-y-0 right-0 flex items-center px-2 rounded-r-md focus:outline-none"
      >
        <ChevronUpDownIcon class="w-5 h-5 text-gray-400" aria-hidden="true" />
      </ComboboxButton>

      <ComboboxOptions
        v-if="filteredCustomers?.length > 0"
        class="absolute z-10 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
      >
        <ComboboxOption
          v-for="customer in filteredCustomers"
          :key="customer.id"
          :value="customer"
          as="template"
          v-slot="{ active, selected }"
        >
          <li
            :class="[
              'relative cursor-default select-none py-2 pl-3 pr-9',
              active ? 'bg-indigo-600 text-white' : 'text-gray-900',
            ]"
          >
            <span :class="['block truncate', selected && 'font-semibold']">
              {{ customer.name }}
            </span>

            <span
              v-if="selected"
              :class="[
                'absolute inset-y-0 right-0 flex items-center pr-4',
                active ? 'text-white' : 'text-indigo-600',
              ]"
            >
              <CheckIcon class="w-5 h-5" aria-hidden="true" />
            </span>
          </li>
        </ComboboxOption>
      </ComboboxOptions>
    </div>
  </Combobox>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxLabel,
  ComboboxOption,
  ComboboxOptions,
} from '@headlessui/vue'
import { useCustomerList, type Customer } from '@/api/useCustomer'

const props = defineProps<{
  modelValue: number
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: typeof props.modelValue): void
}>()

const selectedCustomer = computed({
  get: () => customerList.value?.find((c) => c.id === props.modelValue),
  set: (customer) => customer && emit('update:modelValue', customer.id),
})

const { data: customerList } = useCustomerList()

const query = ref('')
const filteredCustomers = computed(() =>
  !query.value
    ? customerList.value || []
    : customerList.value?.filter((customer) =>
        customer.name.toLowerCase().includes(query.value.toLowerCase()),
      ) || [],
)
</script>
