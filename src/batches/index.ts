import { Event, Id, IsoDate, Name } from '../common'
import { Step } from '../steps'

export type Action = Event & Step
export interface Batch extends Name {
  recipe?: {
    id: Id
    scale: number
  }
  actions: Action[]
  done?: IsoDate
}
