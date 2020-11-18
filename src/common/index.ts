import { DateTime } from 'luxon'

export type Unit = string
export type IsoDate = string
export type IsoDuration = string
export type Id = string

export interface Event {
  date: IsoDate
}

export const event = (): Event => ({ date: new Date().toISOString() })

export interface Note {
  note: string
}

export interface Name {
  name: string
  description: string
}

export const name = (): Name => ({ name: '', description: '' })

export function daysAgo(date: IsoDate): number {
  return Math.floor(Math.abs(DateTime.fromISO(date).diffNow('days').days))
}
