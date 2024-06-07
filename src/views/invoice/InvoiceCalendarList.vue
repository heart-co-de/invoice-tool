<template>
  <div>
    <div v-if="filteredCalendarData.length">
      <div>Found {{ filteredCalendarData.length }} items in the calendar</div>
      <BaseButton @click="$emit('importCalendarEvents', filteredCalendarData)">Import</BaseButton>
    </div>
    <div v-if="error">Error: {{ error }}</div>
  </div>
</template>
<script setup lang="ts">
import { useCalendarQuery, type CalendarEvent } from '@/api/useCalendar'
import BaseButton from '@/components/BaseButton.vue'
import { computed, toRefs } from 'vue'

const props = defineProps<{
  customerId?: number
  month?: number
  year?: number
}>()

defineEmits<{
  importCalendarEvents: (calendarEvents: CalendarEvent[]) => void
}>()

const { customerId } = toRefs(props)

const { data: calendarData, error } = useCalendarQuery(customerId)

const filteredCalendarData = computed(() => {
  if (!calendarData.value) return []
  const data = calendarData.value

  return data
    .filter((event) => event.month === props.month)
    .filter((event) => event.year === props.year)
})
</script>
