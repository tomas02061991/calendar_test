
import type { Weekday } from "rrule"

export type EventRrule = {
    event: CalendarEvent
    recurring: boolean
    rRule?: RRuleObject
  }


export type CalendarEvent = {
    title: string
    start: Date
    end: Date
    
}

export type RRuleObject = {
    freq: string
    interval: number
    byweekday: Weekday[]
    count?: Number|undefined
    dtstart: Date
    until?: Date|undefined
}
