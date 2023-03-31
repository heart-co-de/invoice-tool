<template>
  <form @submit.prevent="onLogin" class="space-y-6">
    <BaseInput
      v-model="loginForm.email"
      name="Email"
      type="email"
      required
      :validation-message="errorMessage"
    />

    <BaseInput
      v-model="loginForm.password"
      name="Password"
      type="password"
      required
      :validation-message="errorMessage"
    />

    <RouterLink
      to="/forgot-password"
      class="block text-sm font-medium text-right text-indigo-600 hover:text-indigo-500"
    >
      Forgot your password?
    </RouterLink>

    <button
      type="submit"
      class="flex justify-center w-full px-3 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    >
      Sign in
    </button>
  </form>
</template>

<script setup lang="ts">
import BaseInput from '@/components/BaseInput.vue'
import { supabase } from '@/services/supabase'
import { reactive, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

// login form
const loginForm = reactive({
  email: '',
  password: '',
})
const onLogin = async () => {
  const { error } = await supabase.auth.signInWithPassword(loginForm)
  if (error) {
    errorMessage.value = error.message
    return
  }
  goToNextRoute()
}
const goToNextRoute = () => {
  const nextRoutePath = router.currentRoute.value.query.redirect || '/home'
  router.replace({ path: String(nextRoutePath) })
}

// error message
const errorMessage = ref('')
watch(loginForm, () => (errorMessage.value = ''))
</script>
