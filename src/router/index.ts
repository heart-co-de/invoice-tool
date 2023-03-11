import { supabase } from '../services/supabase'
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import ForgotPasswordView from '../views/ForgotPasswordView.vue'
import ResetPasswordView from '../views/ResetPasswordView.vue'
import AppLayoutInternal from '@/AppLayoutInternal.vue'
import AppLayoutExternal from '@/AppLayoutExternal.vue'

declare module 'vue-router' {
  interface RouteMeta {
    pageTitle?: string
    requiresAuth?: boolean
    onlyNonAuthed?: boolean
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // Outside of the app
    {
      path: '/',
      component: AppLayoutExternal,
      redirect: '/login',
      children: [
        {
          path: 'login',
          component: LoginView,
          meta: {
            pageTitle: 'Sign in to your account',
            onlyNonAuthed: true,
          },
        },
        {
          path: 'forgot-password',
          component: ForgotPasswordView,
          meta: {
            pageTitle: 'Forgot your password?',
            onlyNonAuthed: true,
          },
        },
        {
          path: 'reset-password',
          component: ResetPasswordView,
          meta: {
            pageTitle: 'Reset your password',
            requiresAuth: true,
          },
        },
      ],
    },

    // Inside of the app
    {
      path: '/',
      component: AppLayoutInternal,
      meta: {
        requiresAuth: true,
        pageTitle: 'Welcome',
      },
      redirect: '/home',
      children: [
        {
          path: 'home',
          component: HomeView,
        },
        {
          path: 'about',
          component: () => import('../views/AboutView.vue'),
        },
        {
          path: 'me',
          component: () => import('../views/MyProfileView.vue'),
          meta: {
            pageTitle: 'My Settings',
          },
        },
      ],
    },
  ],
})

const isLoggedIn = async () => {
  const { data, error } = await supabase.auth.getSession()
  if (error) return false
  return !!data.session
}

router.beforeEach(async (to) => {
  if (to.meta.requiresAuth && !(await isLoggedIn())) {
    return {
      path: '/login',
      query: { redirect: to.fullPath },
    }
  }
  if (to.meta.onlyNonAuthed && (await isLoggedIn())) {
    return {
      path: '/home',
    }
  }
})

export default router
