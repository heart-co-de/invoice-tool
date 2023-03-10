<template>
  <form class="space-y-8 divide-y divide-gray-200">
    <div class="space-y-8 divide-y divide-gray-200">
      <div>
        <div>
          <h3 class="text-base font-semibold leading-6 text-gray-900">Profile</h3>
          <p class="mt-1 text-sm text-gray-500">
            This information will be displayed publicly so be careful what you share.
          </p>
        </div>

        <div class="grid grid-cols-1 mt-6 gap-y-6 gap-x-4 sm:grid-cols-6">
          <div class="sm:col-span-4">
            <label for="username" class="block text-sm font-medium leading-6 text-gray-900"
              >Username</label
            >
            <div class="flex mt-2 rounded-md shadow-sm">
              <span
                class="inline-flex items-center px-3 text-gray-500 border border-r-0 border-gray-300 rounded-l-md sm:text-sm"
                >workcation.com/</span
              >
              <input
                type="text"
                name="username"
                id="username"
                autocomplete="username"
                class="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div class="sm:col-span-6">
            <label for="about" class="block text-sm font-medium leading-6 text-gray-900"
              >About</label
            >
            <div class="mt-2">
              <textarea
                id="about"
                name="about"
                rows="3"
                class="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:py-1.5 sm:text-sm sm:leading-6"
              />
            </div>
            <p class="mt-2 text-sm text-gray-500">Write a few sentences about yourself.</p>
          </div>

          <div class="sm:col-span-6">
            <label for="photo" class="block text-sm font-medium leading-6 text-gray-900"
              >Photo</label
            >
            <div class="flex items-center mt-2">
              <span class="w-12 h-12 overflow-hidden bg-gray-100 rounded-full">
                <svg class="w-full h-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </span>
              <button
                type="button"
                class="ml-5 rounded-md bg-white py-1.5 px-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                Change
              </button>
            </div>
          </div>

          <div class="sm:col-span-6">
            <label for="cover-photo" class="block text-sm font-medium leading-6 text-gray-900"
              >Cover photo</label
            >
            <div
              class="flex justify-center px-6 pt-5 pb-6 mt-2 border-2 border-gray-300 border-dashed rounded-md"
            >
              <div class="space-y-1 text-center">
                <svg
                  class="w-12 h-12 mx-auto text-gray-400"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <div class="flex text-sm text-gray-600">
                  <label
                    for="file-upload"
                    class="relative font-medium text-indigo-600 bg-white rounded-md cursor-pointer focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                  >
                    <span>Upload a file</span>
                    <input id="file-upload" name="file-upload" type="file" class="sr-only" />
                  </label>
                  <p class="pl-1">or drag and drop</p>
                </div>
                <p class="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="pt-8">
        <div>
          <h3 class="text-base font-semibold leading-6 text-gray-900">Personal Information</h3>
          <p class="mt-1 text-sm text-gray-500">
            Use a permanent address where you can receive mail.
          </p>
        </div>
        <div class="grid grid-cols-1 mt-6 gap-y-6 gap-x-4 sm:grid-cols-6">
          <div class="sm:col-span-3">
            <label for="first-name" class="block text-sm font-medium leading-6 text-gray-900"
              >First name</label
            >
            <div class="mt-2">
              <input
                type="text"
                name="first-name"
                id="first-name"
                autocomplete="given-name"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div class="sm:col-span-3">
            <label for="last-name" class="block text-sm font-medium leading-6 text-gray-900"
              >Last name</label
            >
            <div class="mt-2">
              <input
                type="text"
                name="last-name"
                id="last-name"
                autocomplete="family-name"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div class="sm:col-span-4">
            <label for="email" class="block text-sm font-medium leading-6 text-gray-900"
              >Email address</label
            >
            <div class="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autocomplete="email"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div class="sm:col-span-3">
            <label for="country" class="block text-sm font-medium leading-6 text-gray-900"
              >Country</label
            >
            <div class="mt-2">
              <select
                id="country"
                name="country"
                autocomplete="country-name"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              >
                <option>United States</option>
                <option>Canada</option>
                <option>Mexico</option>
              </select>
            </div>
          </div>

          <div class="sm:col-span-6">
            <label for="street-address" class="block text-sm font-medium leading-6 text-gray-900"
              >Street address</label
            >
            <div class="mt-2">
              <input
                type="text"
                name="street-address"
                id="street-address"
                autocomplete="street-address"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div class="sm:col-span-2">
            <label for="city" class="block text-sm font-medium leading-6 text-gray-900">City</label>
            <div class="mt-2">
              <input
                type="text"
                name="city"
                id="city"
                autocomplete="address-level2"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div class="sm:col-span-2">
            <label for="region" class="block text-sm font-medium leading-6 text-gray-900"
              >State / Province</label
            >
            <div class="mt-2">
              <input
                type="text"
                name="region"
                id="region"
                autocomplete="address-level1"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div class="sm:col-span-2">
            <label for="postal-code" class="block text-sm font-medium leading-6 text-gray-900"
              >ZIP / Postal code</label
            >
            <div class="mt-2">
              <input
                type="text"
                name="postal-code"
                id="postal-code"
                autocomplete="postal-code"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="pt-8">
        <div>
          <h3 class="text-base font-semibold leading-6 text-gray-900">Notifications</h3>
          <p class="mt-1 text-sm text-gray-500">
            We'll always let you know about important changes, but you pick what else you want to
            hear about.
          </p>
        </div>
        <div class="mt-6">
          <fieldset>
            <legend class="sr-only">By Email</legend>
            <div class="text-sm font-semibold leading-6 text-gray-900" aria-hidden="true">
              By Email
            </div>
            <div class="mt-4 space-y-4">
              <div class="relative flex items-start">
                <div class="flex items-center h-6">
                  <input
                    id="comments"
                    name="comments"
                    type="checkbox"
                    class="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-600"
                  />
                </div>
                <div class="ml-3 text-sm leading-6">
                  <label for="comments" class="font-medium text-gray-900">Comments</label>
                  <p class="text-gray-500">
                    Get notified when someones posts a comment on a posting.
                  </p>
                </div>
              </div>
              <div class="relative flex items-start">
                <div class="flex items-center h-6">
                  <input
                    id="candidates"
                    name="candidates"
                    type="checkbox"
                    class="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-600"
                  />
                </div>
                <div class="ml-3 text-sm leading-6">
                  <label for="candidates" class="font-medium text-gray-900">Candidates</label>
                  <p class="text-gray-500">Get notified when a candidate applies for a job.</p>
                </div>
              </div>
              <div class="relative flex items-start">
                <div class="flex items-center h-6">
                  <input
                    id="offers"
                    name="offers"
                    type="checkbox"
                    class="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-600"
                  />
                </div>
                <div class="ml-3 text-sm leading-6">
                  <label for="offers" class="font-medium text-gray-900">Offers</label>
                  <p class="text-gray-500">
                    Get notified when a candidate accepts or rejects an offer.
                  </p>
                </div>
              </div>
            </div>
          </fieldset>
          <fieldset class="mt-6">
            <legend class="text-sm font-semibold leading-6 text-gray-900 contents">
              Push Notifications
            </legend>
            <p class="text-sm text-gray-500">These are delivered via SMS to your mobile phone.</p>
            <div class="mt-4 space-y-4">
              <div class="flex items-center">
                <input
                  id="push-everything"
                  name="push-notifications"
                  type="radio"
                  class="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-600"
                />
                <label
                  for="push-everything"
                  class="block ml-3 text-sm font-medium leading-6 text-gray-900"
                  >Everything</label
                >
              </div>
              <div class="flex items-center">
                <input
                  id="push-email"
                  name="push-notifications"
                  type="radio"
                  class="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-600"
                />
                <label
                  for="push-email"
                  class="block ml-3 text-sm font-medium leading-6 text-gray-900"
                  >Same as email</label
                >
              </div>
              <div class="flex items-center">
                <input
                  id="push-nothing"
                  name="push-notifications"
                  type="radio"
                  class="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-600"
                />
                <label
                  for="push-nothing"
                  class="block ml-3 text-sm font-medium leading-6 text-gray-900"
                  >No push notifications</label
                >
              </div>
            </div>
          </fieldset>
        </div>
      </div>
    </div>

    <div class="pt-5">
      <div class="flex justify-end">
        <button
          type="button"
          class="px-3 py-2 text-sm font-semibold text-gray-900 bg-white rounded-md shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          class="inline-flex justify-center px-3 py-2 ml-3 text-sm font-semibold text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
    </div>
  </form>
</template>
