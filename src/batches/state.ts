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
      date: '2020-07-24T11:44:41.293Z',
      recipe: {
        id: 'recipe1',
        scale: 2,
      },
      actions: [],
    },
    done: {
      name: 'My First Kombuch',
      description: 'default kombucha',
      date: '2020-07-25T11:44:41.293Z',
      recipe: {
        id: 'recipe1',
        scale: 0.1,
      },
      actions: [],
      done: '2020-07-27T11:44:41.293Z',
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
        Option.of(draft.batchCache[action.id]).map((batch) => (batch.recipe = undefined))
        break
      }
    }
  })
}
