<template>
  <div
    class="border-t border-t-black text-[10px] mt-[12mm] pl-[25mm] pr-[20mm] pt-[1mm] flex justify-between"
  >
    <!-- Address -->
    <div class="fuss-anschrift">
      <p>
        <span class="font-normal">{{ userData.company_name }}</span>
        <br />
        (Inh. {{ userData.name }})
        <br />
        {{ userData.street }}
        <br />
        {{ userData.zip }} {{ userData.city }}
      </p>
    </div>
    <!-- Bank -->
    <div class="fuss-bankverbindung">
      <p>
        <template v-if="userData.bank_name">
          {{ userData.bank_name }}
          <br />
        </template>
        <template v-if="userData.bank_account_holder">
          Kontoinhaber: {{ userData.bank_account_holder }}
          <br />
        </template>
        <template v-if="userData.bank_iban">
          IBAN: {{ userData.bank_iban }}
          <br />
        </template>
        <template v-if="userData.bank_bic">BIC: {{ userData.bank_bic }}</template>
      </p>
    </div>
    <!-- Tax Office -->
    <div class="fuss-finanzamt">
      <p>
        <template v-if="userData.tax_id">
          Steuer Nummer: {{ userData.tax_id }}
          <br />
        </template>
        <template v-if="userData.tax_office">{{ userData.tax_office }}</template>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { UserData } from '@/api/useUserData'

defineProps<{
  userData: UserData
}>()
</script>
