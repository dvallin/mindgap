import { State, Mutation } from '../state'

import { event, Event, Id, IsoDate } from '../common'
import { Step } from '../steps'
import { Option } from 'lazy-space'
import { Name, name } from '../name'

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

export function updateName(id: string, name: Name): Mutation<State> {
  return draft =>
    Option.of(draft.batches[id]).map(r => {
      r.name = name.name
      r.description = name.description
    })
}

export function updateRecipe(id: string, recipe: Id): Mutation<State> {
  return draft => Option.of(draft.batches[id]).map(r => (r.recipe = { id: recipe, scale: 1 }))
}

export function updateRecipeScale(id: string, scale: number): Mutation<State> {
  return draft =>
    Option.of(draft.batches[id])
      .map(r => r.recipe)
      .map(r => (r.scale = scale))
}

export function addBatch(id: string, batch: Batch): Mutation<State> {
  return draft => (draft.batches[id] = batch)
}

export function addStep(id: string, step: Step): Mutation<State> {
  return draft => Option.of(draft.batches[id]).map(r => r.actions.push({ ...event(), ...step }))
}

export function updateStep(id: string, index: number, step: Step): Mutation<State> {
  return draft => Option.of(draft.batches[id]).map(r => (r.actions[index] = { ...r.actions[index], ...step }))
}
