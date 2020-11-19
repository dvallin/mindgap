import * as redux from 'redux'
import thunk, { ThunkDispatch, ThunkAction } from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import { RecipeState, RecipeAction, recipes, initialState as initialRecipes } from './recipes/state'
import { BatchState, BatchAction, batches, initialState as initialBatches } from './batches/state'

export interface State {
  recipes: RecipeState
  batches: BatchState
}

export const initialState = { recipes: initialRecipes(), batches: initialBatches() }

export function createStore(state?: State): redux.Store<State> {
  return redux.createStore(
    redux.combineReducers({
      recipes,
      batches,
    }),
    state,
    composeWithDevTools(redux.applyMiddleware(thunk))
  )
}

export type Action = RecipeAction | BatchAction
export type Dispatch = ThunkDispatch<State, Action['type'], Action>
export type Thunk<T = void> = ThunkAction<T, State, Action['type'], Action>
