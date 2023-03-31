<template>
  <form @submit.prevent="sendPasswordResetEmail" class="space-y-6">
    <BaseInput
      v-model="email"
      name="Email"
      type="email"
      required
      :validation-message="errorMessage"
    />

    <button
      type="submit"
      class="flex justify-center w-full px-3 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    >
      Send password reset email
    </button>
  </form>
  <BaseModal
    title="Passwort reset email has been sent"
    message="Please check your email inbox and confirm your passwort reset request by clicking on the link included in the email."
    button="Back to login page"
    v-model:is-open="isModalOpen"
    @confirm="router.push('/login')"
  />
</template>

<script setup lang="ts">
import BaseInput from '@/components/BaseInput.vue'
import BaseModal from '@/components/BaseModal.vue'
import { supabase } from '@/services/supabase'
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const email = ref('')
const sendPasswordResetEmail = async () => {
  const { error } = await supabase.auth.resetPasswordForEmail(email.value, {
    redirectTo: window.location.origin + '/reset-password',
  })
  if (error) {
    errorMessage.value = error.message
    return
  }
  isModalOpen.value = true
}

const isModalOpen = ref(false)

// error message
const errorMessage = ref('')
watch(email, () => (errorMessage.value = ''))
</script>
