import * as redux from 'redux'
import thunk, { ThunkDispatch, ThunkAction } from 'redux-thunk'

import { EntityState, EntityAction, entity } from './entities/state'
import { PositionState, PositionAction, position } from './map/state'

export interface State {
  entity: EntityState
  position: PositionState
}

export function createStore(): redux.Store<State> {
  return redux.createStore(redux.combineReducers({ entity, position }), redux.applyMiddleware(thunk))
}

export type Action = EntityAction | PositionAction
export type Dispatch = ThunkDispatch<State, Action['type'], Action>
export type Thunk<T = void> = ThunkAction<T, State, Action['type'], Action>
