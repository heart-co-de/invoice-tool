import { supabase } from '../services/supabase'
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/auth/LoginView.vue'
import ForgotPasswordView from '../views/auth/ForgotPasswordView.vue'
import ResetPasswordView from '../views/auth/ResetPasswordView.vue'
import AppLayoutInternal from '@/AppLayoutInternal.vue'
import AppLayoutExternal from '@/AppLayoutExternal.vue'

declare module 'vue-router' {
  interface RouteMeta {
    pageTitle?: string
    pageAction?: {
      name: string
      route: string
    }
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
          path: 'me',
          component: () => import('../views/MyProfileView.vue'),
          meta: {
            pageTitle: 'My Settings',
          },
        },
        {
          path: 'customer',
          component: () => import('../views/customer/CustomerListView.vue'),
          meta: {
            pageTitle: 'Customers',
            pageAction: {
              name: 'New Customer',
              route: '/customer/new',
            },
          },
        },
        {
          path: 'customer/:customerId',
          props: (route) => ({ customerId: Number(route.params.customerId) }),
          component: () => import('../views/customer/CustomerDetailView.vue'),
          meta: {
            pageTitle: 'Customer Details',
          },
        },
        {
          path: 'invoice',
          component: () => import('../views/invoice/InvoiceListView.vue'),
          meta: {
            pageTitle: 'Invoices',
            pageAction: {
              name: 'New Invoice',
              route: '/invoice/new',
            },
          },
        },
        {
          path: 'invoice/:invoiceId',
          props: (route) => ({ invoiceId: Number(route.params.invoiceId) }),
          component: () => import('../views/invoice/InvoiceDetailView.vue'),
          meta: {
            pageTitle: 'Invoice Details',
          },
        },
        {
          path: 'settings',
          component: () => import('../views/settings/SettingsView.vue'),
          meta: {
            pageTitle: 'Settings',
          },
        },
      ],
    },

    // No layout
    {
      path: '/invoice/:invoiceId/print',
      props: (route) => ({ invoiceId: Number(route.params.invoiceId) }),
      component: () => import('../views/invoice/InvoicePrintView.vue'),
      meta: {
        requiresAuth: true,
      },
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
