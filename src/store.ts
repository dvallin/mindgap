import * as redux from 'redux'
import thunk, { ThunkDispatch, ThunkAction } from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import { RecipeState, RecipeAction, recipes } from './recipes/state'
import { BatchState, BatchAction, batches } from './batches/state'

export interface State {
  recipes: RecipeState
  batches: BatchState
}

export function createStore(): redux.Store<State> {
  return redux.createStore(
    redux.combineReducers({
      recipes,
      batches,
    }),
    composeWithDevTools(redux.applyMiddleware(thunk))
  )
}

export type Action = RecipeAction | BatchAction
export type Dispatch = ThunkDispatch<State, Action['type'], Action>
export type Thunk<T = void> = ThunkAction<T, State, Action['type'], Action>
