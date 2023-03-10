<template>
  <form @submit.prevent="sendPasswordResetEmail" class="space-y-6">
    <BaseInput
      v-model="password"
      name="Password"
      type="password"
      autocomplete="new-password"
      required
      :validation-message="errorMessage"
    />
    <BaseInput
      v-model="passwordConfirm"
      name="Confirm Password"
      type="password"
      autocomplete="new-password"
      required
      :validation-message="errorMessage"
    />

    <button
      type="submit"
      class="flex justify-center w-full px-3 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    >
      Reset your password
    </button>
  </form>
  <BaseModal
    title="Password reset successful"
    button="Lets Go"
    v-model:is-open="isModalOpen"
    @confirm="router.push('/home')"
  />
</template>

<script setup lang="ts">
import BaseInput from '@/components/BaseInput.vue'
import BaseModal from '@/components/BaseModal.vue'
import { supabase } from '@/services/supabase'
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const password = ref('')
const passwordConfirm = ref('')
const sendPasswordResetEmail = async () => {
  if (password.value !== passwordConfirm.value)
    return (errorMessage.value = 'Passwords are not identical')
  const { error } = await supabase.auth.updateUser({ password: password.value })
  if (error) {
    errorMessage.value = error.message
    return
  }
  isModalOpen.value = true
}

const isModalOpen = ref(false)

// error message
const errorMessage = ref('')
watch([password, passwordConfirm], () => (errorMessage.value = ''))
</script>
