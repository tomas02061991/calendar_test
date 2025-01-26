import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import {type Frequency } from 'rrule'
import type { RRuleObject } from '@/types/calendar.types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function toFrequencyText(frequency: Frequency): string {
  switch (frequency) {
    case 3:
        return "Days"
    case 2:
        return "Weeks"
    case 1:
        return "Months" 
    case 0:
        return "Years"   
    default:
        return "unknown"
}
}

export function toRRule(rule: RRuleObject): Object {
  return {...rule, freq: Number(rule.freq)}
}


