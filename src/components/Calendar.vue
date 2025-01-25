<script setup lang="ts">
import FullCalendar from '@fullcalendar/vue3'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import rrulePlugin from '@fullcalendar/rrule'
import {ref} from 'vue';
import EventModal from './EventModal.vue';
import type { EventRrule } from '@/types/calendar.types';
import { FormatDateOptions } from '@fullcalendar/core/index.js';
import { RRule } from 'rrule';
import { toRRule } from '@/lib/utils';

interface Props {
    events?: []
}
defineProps<Props>()


const openModal = ref(false)
const currentEvent = ref()

const selectDate = (info) => {
  currentEvent.value = info
  openModal.value = true
}

const calendarOptions = ref({
        plugins: [ timeGridPlugin, interactionPlugin, rrulePlugin ],
        initialView: 'timeGridWeek',
        selectable: true,
        select: selectDate,
        events: []
      })



const onModalClose = (rule: EventRrule) => {
  if(rule) {
    if(rule.recurring && rule.rRule) {
      console.log("to push", {...rule.event, rrule: rule.rRule})
      calendarOptions.value.events.push({...rule.event, rrule: toRRule(rule.rRule)})
    } else {
      calendarOptions.value.events.push(rule.event)
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