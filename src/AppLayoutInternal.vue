<template>
  <div>
    <TransitionRoot as="template" :show="sidebarOpen">
      <Dialog as="div" class="relative z-40 lg:hidden" @close="sidebarOpen = false">
        <TransitionChild
          as="template"
          enter="transition-opacity ease-linear duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-gray-600 bg-opacity-75" />
        </TransitionChild>

        <div class="fixed inset-0 z-40 flex">
          <TransitionChild
            as="template"
            enter="transition ease-in-out duration-300 transform"
            enter-from="-translate-x-full"
            enter-to="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leave-from="translate-x-0"
            leave-to="-translate-x-full"
          >
            <DialogPanel class="relative flex flex-col flex-1 w-full max-w-xs bg-white">
              <TransitionChild
                as="template"
                enter="ease-in-out duration-300"
                enter-from="opacity-0"
                enter-to="opacity-100"
                leave="ease-in-out duration-300"
                leave-from="opacity-100"
                leave-to="opacity-0"
              >
                <div class="absolute top-0 right-0 pt-2 -mr-12">
                  <button
                    type="button"
                    class="flex items-center justify-center w-10 h-10 ml-1 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    @click="sidebarOpen = false"
                  >
                    <span class="sr-only">Close sidebar</span>
                    <XMarkIcon class="w-6 h-6 text-white" aria-hidden="true" />
                  </button>
                </div>
              </TransitionChild>
              <div class="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                <div class="flex items-center flex-shrink-0 px-4">
                  <img
                    class="w-auto h-8"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    alt="Your Company"
                  />
                </div>
                <nav class="px-2 mt-5 space-y-1">
                  <RouterLink
                    v-for="item in navigation"
                    :key="item.name"
                    :to="item.to"
                    :class="[
                      item.current
                        ? 'bg-gray-100 text-gray-900'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                      'group flex items-center rounded-md px-2 py-2 text-base font-medium',
                    ]"
                  >
                    <component
                      :is="item.icon"
                      :class="[
                        item.current ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500',
                        'mr-4 h-6 w-6 flex-shrink-0',
                      ]"
                      aria-hidden="true"
                    />
                    {{ item.name }}
                  </RouterLink>
                </nav>
              </div>
              <div class="flex flex-shrink-0 p-4 border-t border-gray-200">
                <a href="#" class="flex-shrink-0 block group">
                  <div class="flex items-center">
                    <div>
                      <img
                        class="inline-block w-10 h-10 rounded-full"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                      />
                    </div>
                    <div class="ml-3">
                      <p class="text-base font-medium text-gray-700 group-hover:text-gray-900">
                        Tom Cook
                      </p>
                      <p class="text-sm font-medium text-gray-500 group-hover:text-gray-700">
                        View profile
                      </p>
                    </div>
                  </div>
                </a>
              </div>
            </DialogPanel>
          </TransitionChild>
          <div class="flex-shrink-0 w-14">
            <!-- Force sidebar to shrink to fit close icon -->
          </div>
        </div>
      </Dialog>
    </TransitionRoot>

    <!-- Static sidebar for desktop -->
    <div class="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
      <!-- Sidebar component, swap this element with another sidebar if you like -->
      <div class="flex flex-col flex-1 min-h-0 bg-white border-r border-gray-200">
        <div class="flex flex-col flex-1 pt-5 pb-4 overflow-y-auto">
          <div class="flex items-center flex-shrink-0 px-4">
            <img
              class="w-auto h-8"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            />
          </div>
          <nav class="flex-1 px-2 mt-5 space-y-1 bg-white">
            <RouterLink
              v-for="item in navigation"
              :key="item.name"
              :to="item.to"
              :class="[
                item.current
                  ? 'bg-gray-100 text-gray-900'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                'group flex items-center rounded-md px-2 py-2 text-sm font-medium',
              ]"
            >
              <component
                :is="item.icon"
                :class="[
                  item.current ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500',
                  'mr-3 h-6 w-6 flex-shrink-0',
                ]"
                aria-hidden="true"
              />
              {{ item.name }}
            </RouterLink>
          </nav>
        </div>
        <div v-if="isUserDataLoading">Loading...</div>
        <div v-if="isUserDataError">Error Loading User Data</div>
        <div v-else class="flex flex-shrink-0 p-4 border-t border-gray-200">
          <RouterLink to="/me" class="flex-shrink-0 block w-full group">
            <div class="flex items-center">
              <div>
                <img
                  class="inline-block rounded-full h-9 w-9"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                />
              </div>
              <div class="ml-3">
                <p class="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                  {{ userData?.name }}
                </p>
                <p class="text-xs font-medium text-gray-500 group-hover:text-gray-700">
                  View profile
                </p>
              </div>
            </div>
          </RouterLink>
        </div>
      </div>
    </div>

    <div class="flex flex-col flex-1 lg:pl-64">
      <div class="sticky top-0 z-10 pt-1 pl-1 bg-white sm:pl-3 sm:pt-3 lg:hidden">
        <button
          type="button"
          class="-ml-0.5 -mt-0.5 inline-flex h-12 w-12 items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
          @click="sidebarOpen = true"
        >
          <span class="sr-only">Open sidebar</span>
          <Bars3Icon class="w-6 h-6" aria-hidden="true" />
        </button>
      </div>
      <main class="flex-1">
        <div class="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div class="pb-5 border-b border-gray-200 sm:flex sm:items-center sm:justify-between">
            <h3 class="text-base font-semibold leading-6 text-gray-900">{{ pageTitle }}</h3>
            <div v-if="pageAction" class="mt-3 sm:ml-4 sm:mt-0">
              <router-link
                :to="pageAction.route"
                class="inline-flex items-center px-3 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {{ pageAction.name }}
              </router-link>
            </div>
          </div>

          <div class="">
            <RouterView />
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { RouterLink, useRoute } from 'vue-router'
import {
  Bars3Icon,
  HomeIcon,
  UsersIcon,
  XMarkIcon,
  DocumentTextIcon,
  CogIcon,
} from '@heroicons/vue/24/outline'
import { useUserData } from './api/useUserData'

const route = useRoute()

const pageTitle = computed(() => route.meta.pageTitle)
const pageAction = computed(() => route.meta.pageAction)

const navItems = [
  { name: 'Home', to: '/home', icon: HomeIcon },
  { name: 'Customers', to: '/customer', icon: UsersIcon },
  { name: 'Invoices', to: '/invoice', icon: DocumentTextIcon },
  { name: 'Settings', to: '/settings', icon: CogIcon },
]

const navigation = computed(() =>
  navItems.map((navItem) => ({
    ...navItem,
    current: route.path.startsWith(navItem.to),
  })),
)

const sidebarOpen = ref(false)

const { data: userData, isError: isUserDataError, isLoading: isUserDataLoading } = useUserData()
</script>
