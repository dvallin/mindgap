import dayjs from 'dayjs'

export type Unit = string
export type IsoDate = string
export type IsoDuration = string
export type Id = string

export interface Event {
  date: IsoDate
}

export function matches<K extends string>(value: Record<K, string>, keys: K[], query: string): boolean {
  const keywords = query.split(' ')
  return keys.some(key => {
    const v = value[key].toLowerCase()
    return keywords.some(keyword => v.includes(keyword))
  })
}

export const event = (): Event => ({ date: new Date().toISOString() })

export interface Note {
  note: string
}

export function daysAgo(date: IsoDate): number {
  return dayjs().diff(dayjs(date), 'd')
}
