<script setup lang="ts">
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

import { Calendar } from '@/components/ui/v-calendar'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-vue-next'

interface Props {
    disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false
})

const model = defineModel<Date>()
</script>

<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button
        :variant="'outline'"
        :disabled="disabled"
        :class="cn(
          'w-[280px] justify-start text-left font-normal',
          !model && 'text-muted-foreground',
        )"
      >
        <CalendarIcon class="mr-2 h-4 w-4" />
        <span>{{ model ? format(model, 'PPP - hh:mm') : "Pick a date" }}</span>
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-auto p-0">
      <Calendar v-model="model" mode="datetime" />
    </PopoverContent>
  </Popover>
</template>