import produce from 'immer'
import { List } from 'lazy-space'

import { BaseAction } from '../react-helpers'

export type EntityCreateAction = BaseAction<'ENTITY_CREATE'> & { entity: Entity }
export const entityCreateAction = (entity: Entity): EntityCreateAction => ({
  type: 'ENTITY_CREATE',
  entity,
})

export type EntityAction = EntityCreateAction

export type Entity = string

export interface EntityState {
  dirty: List<string>
}

export const initialState = (): EntityState => ({ dirty: List.empty() })

export const entity = (state: EntityState = initialState(), action: EntityAction): EntityState => {
  return produce(state, (draft) => {
    switch (action.type) {
      case 'ENTITY_CREATE': {
        draft.dirty = draft.dirty.append(action.entity)
      }
    }
  })
}
