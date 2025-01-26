<script setup lang="ts">
import {ref } from 'vue'
import { RRule } from 'rrule'
import DatePicker from '@/components/DatePicker.vue'
import type { CalendarEvent, EventRrule } from '@/types/calendar.types';
import FrequencySelector from './FrequencySelector.vue';
import Separator from './ui/separator/Separator.vue';
import Switch from './ui/switch/Switch.vue';
import Input from './ui/input/Input.vue';


interface Props {
    newEvent: CalendarEvent
}

const props = defineProps<Props>()

const newRule = ref<EventRrule>({
  event: {
    title:  props.newEvent.title || '',
    start: props.newEvent.start,
    end: props.newEvent.end
  },
  recurring: false,
  rRule:{
    freq: RRule.WEEKLY.toString(),
    interval: 1,
    byweekday: [],
    count: null,
    dtstart: props.newEvent.start,
    until: props.newEvent.end
  }
})

const isRrule = ref<boolean>(false)

const toggleRrule = (value: boolean) => {
  isRrule.value = value
  newRule.value.recurring = isRrule.value

}

defineEmits(['cancel', 'submit'])

</script>

<template>
    <form @submit.prevent="$emit('submit', newRule)">
      <fieldset class="flex flex-col gap-4">
        <label>
          <span>Title</span>
          <Input class="w-[280px]" type="text" v-model="newRule.event.title" />
        </label>
      <label>
        <span>Start</span>
        <DatePicker v-model="newRule.event.start" />
      </label>
      <label>
        <span>End</span>
        <DatePicker v-model="newRule.event.end" />
      </label>
    </fieldset>
    <div class="flex items-center space-x-2 mt-4 mb-4">
      <Switch id="recurring" :checked="isRrule" @update:checked="toggleRrule" />
      <label for="recurringe">Recurring</Label>
    </div>
    <fieldset v-if="isRrule && newRule.rRule">
      <Separator label="Recurring" class="mb-4"/>
      <FrequencySelector 
        v-model:interval="newRule.rRule.interval" 
        v-model:frequency="newRule.rRule.freq" 
        v-model:by-weekday="newRule.rRule.byweekday"
        v-model:until="newRule.rRule.until"
        v-model:count="newRule.rRule.count"
      />
    </fieldset>
    <fieldset class="flex justify-between items-center flex-row">
      <button type="submit">Create</button>
      <button type="button" @click="$emit('cancel')">Cancel</button>
    </fieldset>
    </form>
</template>

<style lang="css" scoped>


  label{
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
</style>