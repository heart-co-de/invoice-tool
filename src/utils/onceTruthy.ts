import { until } from '@vueuse/core'
import type { Ref } from 'vue'

export const onceTruthy = async <T>(value: Ref<T>, callback: (value: T & {}) => void) => {
  await until(value).toBeTruthy()
  callback(value.value!)
}
