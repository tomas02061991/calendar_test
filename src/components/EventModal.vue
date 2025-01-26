<script setup lang="ts">
import {
    Dialog,
    DialogPanel,
    DialogTitle,
  } from '@headlessui/vue'

import EventForm from './EventForm.vue';
import type { CalendarEvent } from '@/types/calendar.types';
interface Props {
    isOpen?: boolean
    event: CalendarEvent
}

withDefaults(defineProps<Props>(), {
  isOpen: false
})

const emit = defineEmits(['onClose'])

</script>

<template>
    <Dialog :open="isOpen" @close="emit('onClose')">
        <div class="fixed inset-0 bg-black/30 z-1" aria-hidden="true" />
        <div class="fixed inset-0 flex w-screen items-center justify-center p-4 z-10">
        <DialogPanel class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
            <DialogTitle class="mb-4">Add new event</DialogTitle>
            <EventForm :new-event="event" @cancel="$emit('onClose')" @submit="(rule) => $emit('onClose', rule)"/>
        </DialogPanel>
        </div>
    </Dialog>
</template>

<style lang="css" scoped>
</style>