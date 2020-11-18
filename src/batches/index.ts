import { event, Event, Id, IsoDate, name, Name } from '../common'
import { Step } from '../steps'

export type Action = Event & Step

export interface Batch extends Name, Event {
  recipe?: {
    id: Id
    scale: number
  }
  actions: Action[]
  done?: IsoDate
}

export const batch = (): Batch => ({ ...name(), ...event(), actions: [] })
