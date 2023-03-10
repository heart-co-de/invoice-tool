<script setup lang="ts">
import { useAsyncState } from '@vueuse/core'
import { supabase } from '../services/supabase'
const { state: testData } = useAsyncState(
  async () => (await supabase.from('customer').select()).data,
  [],
)

const { state: userData } = useAsyncState(async () => (await supabase.auth.getUser()).data, null)
</script>

<template>
  <pre>
    {{ testData }}
  </pre>
  <pre>
    {{ userData }}
  </pre>
</template>
