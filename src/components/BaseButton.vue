<template>
  <button
    :type="type"
    :disabled="disabled"
    class="flex justify-center px-3 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    :class="{
      'opacity-50 cursor-not-allowed': disabled,
    }"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed, toRefs } from 'vue'

const props = defineProps<{
  disabled?: boolean
  type?: 'button' | 'submit'
}>()

const { disabled } = toRefs(props)

const type = computed(() => props.type ?? 'button')
</script>
