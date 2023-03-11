import { until } from '@vueuse/core'
import type { Ref } from 'vue'

export const onceTruthy = async (value: Ref<unknown>, callback: () => void) => {
  await until(value).toBeTruthy()
  callback()
}
