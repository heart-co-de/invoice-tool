<template>
  <div>
    <label :for="nameKebabCase" class="block text-sm font-medium leading-6 text-gray-900">
      {{ label || name }}
    </label>
    <div class="relative mt-2 rounded-md shadow-sm">
      <input
        :type="type"
        :name="nameKebabCase"
        :id="nameKebabCase"
        class="block w-full rounded-md border-0 py-1.5 ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
        :class="{
          'text-red-900 ring-red-300 placeholder:text-red-300 focus:ring-red-500 pr-10':
            validationMessage,
          'text-gray-900 ring-gray-300 placeholder:text-gray-400 focus:ring-indigo-600':
            !validationMessage,
        }"
        :placeholder="placeholder"
        v-model="model"
        :autocomplete="autocompleteComputed"
        :aria-invalid="!!validationMessage"
        :aria-describedby="validationMessage ? `${nameKebabCase}-error` : ''"
        :required="!!required"
      />
      <div
        v-if="validationMessage"
        class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none"
      >
        <ExclamationCircleIcon class="w-5 h-5 text-red-500" aria-hidden="true" />
      </div>
    </div>
    <p v-if="validationMessage" class="mt-2 text-sm text-red-600" :id="`${nameKebabCase}-error`">
      {{ validationMessage }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ExclamationCircleIcon } from '@heroicons/vue/20/solid'
import { computed } from 'vue'
import { kebabCase } from 'lodash'

const props = defineProps<{
  name: string
  type: 'email' | 'text' | 'password'
  modelValue: string
  label?: string
  validationMessage?: string
  placeholder?: string
  autocomplete?: string
  required?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const model = computed({
  get: () => props.modelValue,
  set: (newValue) => emit('update:modelValue', newValue),
})

const autocompleteComputed = computed(() => {
  if (props.autocomplete) return props.autocomplete
  if (props.type === 'email') return 'email'
  if (props.type === 'password') return 'current-password'
  return ''
})

const nameKebabCase = computed(() => kebabCase(props.name))
</script>
