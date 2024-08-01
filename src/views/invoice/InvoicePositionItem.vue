<template>
  <tr>
    <td class="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 whitespace-nowrap sm:pl-0">
      <BaseInput
        v-if="isEditMode"
        is-label-hidden
        is-no-margin
        name="Service Date"
        type="date"
        v-model="serviceDate"
        class="-m-4 -mr-3"
        ref="serviceDateInput"
      />
      <template v-else>{{ formatAsDate(new Date(serviceDate)) }}</template>
    </td>
    <td class="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">
      <BaseInput
        v-if="isEditMode"
        is-label-hidden
        is-no-margin
        name="Description"
        type="text"
        v-model="description"
        class="-mx-2 -my-4"
      />
      <template v-else>{{ description }}</template>
    </td>
    <td class="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">
      <BaseInput
        v-if="isEditMode"
        is-label-hidden
        is-no-margin
        name="Quantity"
        type="number"
        step="0.01"
        v-model="quantity"
        class="-mx-2 -my-4"
      />
      <template v-else>{{ formatQuantity(quantity, unitQuantity) }}</template>
    </td>
    <td class="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">
      <DropdownUnitQuantity
        v-if="isEditMode"
        is-label-hidden
        is-no-margin
        v-model="unitQuantity"
        class="-mx-2 -my-4"
      />
      <template v-else>{{ formatUnit(quantity, unitQuantity) }}</template>
    </td>
    <td class="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">
      <BaseInput
        v-if="isEditMode"
        is-label-hidden
        is-no-margin
        name="Price Per Quantity"
        type="number"
        v-model="pricePerQuantity"
        class="-mx-2 -my-4"
      />
      <template v-else>{{ formatAsEuro(pricePerQuantity) }} / {{ unitQuantity }}</template>
    </td>
    <td class="px-3 py-4 text-sm text-gray-500 whitespace-nowrap text-right">
      {{ formatAsEuro(price) }}
    </td>
    <td class="relative py-4 pl-3 pr-4 text-sm font-medium text-right whitespace-nowrap sm:pr-0">
      <button @click.prevent="toggleEditMode" class="text-indigo-600 hover:text-indigo-900">
        {{ isEditMode ? 'Done' : 'Edit' }}
      </button>
    </td>
  </tr>
</template>

<script setup lang="ts">
import BaseInput from '@/components/BaseInput.vue'
import { computed, nextTick, onMounted, ref } from 'vue'
import type { InvoicePosition } from '../../api/useInvoice'
import DropdownUnitQuantity from '@/components/DropdownUnitQuantity.vue'
import { formatAsDate, formatQuantity, formatUnit } from '@/utils/unitHelpers'
import { formatAsEuro } from '@/utils/unitHelpers'

const props = defineProps<{
  invoicePosition: InvoicePosition
  isInitiallyInEditMode?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:invoicePosition', invoicePosition: InvoicePosition): void
}>()

const recalculatePrice = (invoicePosition: InvoicePosition) => ({
  ...invoicePosition,
  price: invoicePosition.quantity * invoicePosition.price_per_quantity,
})

const createTwoWayBinding = <TPropName extends keyof InvoicePosition>(propName: TPropName) =>
  computed({
    get: () => props.invoicePosition[propName],
    set: (newValue: InvoicePosition[TPropName]) => {
      emit(
        'update:invoicePosition',
        recalculatePrice({
          ...props.invoicePosition,
          [propName]: newValue,
        }),
      )
    },
  })

const serviceDate = createTwoWayBinding('service_date')
const description = createTwoWayBinding('description')
const quantity = createTwoWayBinding('quantity')
const unitQuantity = createTwoWayBinding('unit_quantity')
const pricePerQuantity = createTwoWayBinding('price_per_quantity')
const price = computed(() => props.invoicePosition.price)

const isEditMode = ref(!!props.isInitiallyInEditMode)
const serviceDateInput = ref<InstanceType<typeof BaseInput> | null>(null)

const focusServiceDateInput = async () => {
  await nextTick()
  serviceDateInput.value?.$el?.querySelector?.('input')?.focus?.()
}

onMounted(() => {
  if (isEditMode.value) {
    focusServiceDateInput()
  }
})

const toggleEditMode = () => {
  isEditMode.value = !isEditMode.value
  if (isEditMode.value) {
    focusServiceDateInput()
  }
}
</script>
