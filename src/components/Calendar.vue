<script setup lang="ts">
import FullCalendar from '@fullcalendar/vue3'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import rrulePlugin from '@fullcalendar/rrule'
import {ref} from 'vue';
import EventModal from './EventModal.vue';
import type { EventRrule } from '@/types/calendar.types';
import { toRRule } from '@/lib/utils';
import type { CalendarOptions, EventClickArg, DateSelectArg } from '@fullcalendar/core/index.js';

interface Props {
    events?: []
}
defineProps<Props>()


const openModal = ref(false)
const currentEvent = ref()

const selectDate = (info: EventClickArg | DateSelectArg) => {
  if(Object.keys(info).includes('event')){
    // @ts-ignore
    currentEvent.value = info.event
  } else {
    currentEvent.value = info
  }
  openModal.value = true
}

const calendarOptions = ref<CalendarOptions>({
        plugins: [ timeGridPlugin, interactionPlugin, rrulePlugin ],
        initialView: 'timeGridWeek',
        selectable: true,
        select: selectDate,
        eventClick: selectDate,
        events: []
      })



const onModalClose = (rule: EventRrule) => {
  if(rule) {
    if(rule.recurring && rule.rRule) {
      // @ts-ignore
      calendarOptions.value.events = [...calendarOptions.value.events, {...rule.event, rrule: toRRule(rule.rRule)} ]
    } else {
      calendarOptions.value.events = [...calendarOptions.value.events, rule.event]
    }
  }
  openModal.value = false
}

</script>

<template>
  <div>
    <FullCalendar :options="calendarOptions"/>
    <EventModal v-if="currentEvent" :is-open="openModal" @on-close="onModalClose" :event="currentEvent"/>
  </div>
  
</template>

<style lang="css" scoped>
</style>