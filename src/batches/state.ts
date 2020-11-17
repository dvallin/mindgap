import produce from 'immer'
import { Option } from 'lazy-space'

import { Batch } from '.'
import { Id } from '../common'
import { BaseAction } from '../react-helpers'

export interface BatchState {
  batchCache: { [id in Id]: Batch }
}

export type RemoveRecipe = BaseAction<'REMOVE_RECIPE'> & { id: Id }
export const removeRecipe = (id: Id): RemoveRecipe => ({ type: 'REMOVE_RECIPE', id })

export type AddRecipe = BaseAction<'ADD_RECIPE'> & { id: Id; recipe: Id }
export const removedRecipe = (id: Id, recipe: Id): AddRecipe => ({ type: 'ADD_RECIPE', id, recipe })

export type BatchAction = RemoveRecipe | AddRecipe

export const initialState = (): BatchState => ({
  batchCache: {
    batch1: {
      name: 'My Special Kombuch',
      description: 'default kombucha with some chilis',
      recipe: {
        id: 'recipe1',
        scale: 2,
      },
      actions: [],
    },
  },
})

export const batches = (state: BatchState = initialState(), action: BatchAction): BatchState => {
  return produce(state, (draft) => {
    switch (action.type) {
      case 'ADD_RECIPE': {
        Option.of(draft.batchCache[action.id]).map((batch) => (batch.recipe = { id: action.recipe, scale: 1 }))
        break
      }
      case 'REMOVE_RECIPE': {
        Option.of(draft.batchCache[action.id]).map((batch) => delete batch.recipe)
        break
      }
    }
  })
}
