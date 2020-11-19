import produce from 'immer'
import { Option } from 'lazy-space'

import { Batch } from '.'
import { event, Id, Name } from '../common'
import { BaseAction } from '../react-helpers'
import { Step } from '../steps'

export interface BatchState {
  batchCache: { [id in Id]: Batch }
}

export type AddBatch = BaseAction<'BATCH', 'ADD_BATCH'> & { id: Id; batch: Batch }
export const addBatch = (id: Id, batch: Batch): AddBatch => ({ module: 'BATCH', type: 'ADD_BATCH', id, batch })

export type UpdateName = BaseAction<'BATCH', 'UPDATE_NAME'> & { id: Id; name: Name }
export const updateName = (id: Id, name: Name): UpdateName => ({ module: 'BATCH', type: 'UPDATE_NAME', id, name })

export type RemoveRecipe = BaseAction<'BATCH', 'REMOVE_RECIPE'> & { id: Id }
export const removeRecipe = (id: Id): RemoveRecipe => ({ module: 'BATCH', type: 'REMOVE_RECIPE', id })

export type UpdateRecipe = BaseAction<'BATCH', 'UPDATE_RECIPE'> & { id: Id; recipe: Id }
export const updateRecipe = (id: Id, recipe: Id): UpdateRecipe => ({ module: 'BATCH', type: 'UPDATE_RECIPE', id, recipe })

export type UpdateRecipeScale = BaseAction<'BATCH', 'UPDATE_RECIPE_SCALE'> & { id: Id; scale: number }
export const updateRecipeScale = (id: Id, scale: number): UpdateRecipeScale => ({ module: 'BATCH', type: 'UPDATE_RECIPE_SCALE', id, scale })

export type AddAction = BaseAction<'BATCH', 'ADD_ACTION'> & { id: Id; step: Step }
export const addAction = (id: Id, step: Step): AddAction => ({ module: 'BATCH', type: 'ADD_ACTION', id, step })

export type UpdateAction = BaseAction<'BATCH', 'UPDATE_ACTION'> & { id: Id; index: number; step: Step }
export const updateAction = (id: Id, index: number, step: Step): UpdateAction => ({
  module: 'BATCH',
  type: 'UPDATE_ACTION',
  id,
  index,
  step,
})

export type BatchAction = AddBatch | RemoveRecipe | UpdateRecipe | UpdateRecipeScale | UpdateName | AddAction | UpdateAction

export const initialState = (): BatchState => ({ batchCache: {} })

export const batches = (state: BatchState = initialState(), action: BatchAction): BatchState => {
  if (action.module !== 'BATCH') {
    return state
  }
  return produce(state, (draft) => {
    switch (action.type) {
      case 'ADD_BATCH': {
        draft.batchCache[action.id] = action.batch
        break
      }
      case 'UPDATE_NAME': {
        console.log(action)
        Option.of(draft.batchCache[action.id]).map((batch) => {
          batch.name = action.name.name
          batch.description = action.name.description
        })
        break
      }
      case 'UPDATE_RECIPE': {
        Option.of(draft.batchCache[action.id]).map((batch) => (batch.recipe = { id: action.recipe, scale: 1 }))
        break
      }
      case 'UPDATE_RECIPE_SCALE': {
        Option.of(draft.batchCache[action.id])
          .map((batch) => batch.recipe)
          .map((r) => (r.scale = action.scale))
        break
      }
      case 'REMOVE_RECIPE': {
        Option.of(draft.batchCache[action.id]).map((batch) => delete batch.recipe)
        break
      }
      case 'ADD_ACTION': {
        Option.of(draft.batchCache[action.id]).map((batch) => batch.actions.push({ ...event(), ...action.step }))
        break
      }
      case 'UPDATE_ACTION': {
        Option.of(draft.batchCache[action.id]).map(
          (batch) => (batch.actions[action.index] = { ...batch.actions[action.index], ...action.step })
        )
        break
      }
    }
  })
}
