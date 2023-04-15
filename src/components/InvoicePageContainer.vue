<template>
  <div
    class="mx-auto w-[209.99mm] h-[296.86mm] relative text-[12px] border shadow-2xl print:shadow-none print:border-none my-8 print:my-0 bg-contain bg-opacity-50 font-[200]"
    :style="{
      backgroundImage: b ? `url(${backgroundImage})` : '',
    }"
  >
    <slot />
  </div>
  <div class="h-8 print:hidden"></div>
  <BaseButton class="fixed left-8 top-8 print:hidden" @click="router.push(`/invoice/${invoiceId}`)">
    <ChevronLeftIcon class="w-4" />
  </BaseButton>
</template>
<script setup lang="ts">
import backgroundImage from '@/assets/DIN_5008_Form_B.svg'
import { useMagicKeys } from '@vueuse/core'
import BaseButton from './BaseButton.vue'
import { ChevronLeftIcon } from '@heroicons/vue/20/solid'
import { useRouter } from 'vue-router'

const { b } = useMagicKeys()

const router = useRouter()
const { invoiceId } = router.currentRoute.value.params
</script>
