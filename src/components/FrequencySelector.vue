<script setup lang="ts">
import { toFrequencyText } from '@/lib/utils';
import { RRule, Weekday } from 'rrule'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import Checkbox from './ui/checkbox/Checkbox.vue';
import DatePicker from '@/components/DatePicker.vue'
import { ref } from 'vue';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import Input from './ui/input/Input.vue';
interface Props {

}
defineProps<Props>()

const interval = defineModel<Number>('interval', {required: true})
const freq = defineModel<string>('frequency', { required: true})
const byWeekday = defineModel<Array<Weekday>>('byWeekday', {required: true,})
const until = defineModel<Date|null>('until', {required: true })
const count = defineModel<Number|null>('count',{required: true})

const end = ref<string>('0')
const occurance = ref<Number>(1)

const weekdays = ref([
  RRule.MO,
  RRule.TU,
  RRule.WE,
  RRule.TH,
  RRule.FR,
  RRule.SA,
  RRule.SU
])

const selectedWeekdays = ref<Weekday[]>([])

const calculateEnd = () => {
  if(end.value === '1') {
    until.value = null
  }
  if(end.value == '0') {
    count.value = null
  }
}



</script>

<template>
    <label class="mb-4 block">
        <span class="mb-2 block">Repeat every</span>
        <div>
          <input class="w-1/6" type="number" v-model="interval"/>
          <DropdownMenu>
            <DropdownMenuTrigger as-child>
              <input :value="toFrequencyText(Number(freq))"/>
            </DropdownMenuTrigger>
            <DropdownMenuContent class="w-56">
              <DropdownMenuRadioGroup v-model="freq">
                <DropdownMenuRadioItem :value="RRule.DAILY.toString()">
                  {{  toFrequencyText(RRule.DAILY) }}
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem :value="RRule.WEEKLY.toString()">
                  {{ toFrequencyText(RRule.WEEKLY) }}
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem :value="RRule.MONTHLY.toString()">
                  {{ toFrequencyText(RRule.MONTHLY) }}
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem :value="RRule.YEARLY.toString()">
                  {{ toFrequencyText(RRule.YEARLY) }}
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </label>
      <label class="mb-4 block">
        <span>Repeat on</span>
        <div class="weekdays">
          <div class="daySelect" v-for="weekday in weekdays">
            <span>{{  weekday.toString().toLowerCase() }}</span>
            <Checkbox 
                :value="weekday.toString()" 
                :checked="byWeekday.includes(weekday)"  
                @update:checked="(isChecked) => 
                isChecked ? byWeekday.push(weekday) :byWeekday.splice(byWeekday.indexOf(weekday), 1)"
                />
          </div>
        </div>
      </label>
      <label>
        <span>Ends</span>
        <div>
          <RadioGroup v-model="end" @update:model-value="calculateEnd">
            <div class="flex items-center space-x-2">
              <RadioGroupItem id="r2" value="0" />
              <div class="flex items-center justify-between grow">
                <label for="r2">On</Label>
                <DatePicker :disabled="end !== '0'" v-model="until" />
              </div>
            </div>
            <div class="flex items-center space-x-3">
              <RadioGroupItem id="r3" value="1" />
              <div class="flex items-center justify-between grow">
                <label for="r3">After</Label>
                <div class="flex items-center">
                  <Input class="w-1/5" :disabled="end !== '1'" type="number" v-model="occurance" @update:model-value="(value) => count = Number(value)"/>
                  <span>occurances</span>
                </div>
              </div>
            </div>
          </RadioGroup>
        </div>
      </label>
</template>

<style lang="css" scoped>
.weekdays {
    display: flex;
    justify-content: center;
    gap: 1rem;
}
.daySelect {
    display: flex;
    flex-direction: column;
    align-items: center;
}

</style>