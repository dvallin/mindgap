import produce from 'immer'
import { Option, List } from 'lazy-space'

import { BaseAction } from '../react-helpers'
import { Entity } from '../entities/state'

export type PositionUpdatedAction = BaseAction<'POSITION_UPDATED'> & { coordinates: GeoCoordinates; data: string }
export const positionUpdatedAction = (coordinates: GeoCoordinates, data: string): PositionUpdatedAction => ({
  type: 'POSITION_UPDATED',
  coordinates,
  data,
})

export type LocationAddAction = BaseAction<'LOCATION_ADD'> & { entity: Entity; coordinates: GeoCoordinates; data: string }
export const locationAddAction = (entity: Entity, coordinates: GeoCoordinates, data: string): LocationAddAction => ({
  type: 'LOCATION_ADD',
  entity,
  coordinates,
  data,
})

export type LocationDeleteAction = BaseAction<'LOCATION_DELETE'> & { entity: Entity }
export const locationDeleteAction = (entity: Entity): LocationDeleteAction => ({
  type: 'LOCATION_DELETE',
  entity,
})

export type LocationFocusAction = BaseAction<'LOCATION_FOCUS'> & { coordinates: GeoCoordinates }
export const locationFocusAction = (coordinates: GeoCoordinates): LocationFocusAction => ({
  type: 'LOCATION_FOCUS',
  coordinates,
})

export type PositionAction = PositionUpdatedAction | LocationAddAction | LocationDeleteAction | LocationFocusAction

export interface GeoCoordinates {
  latitude: number
  longitude: number
}

export interface Location {
  coordinates: GeoCoordinates
  data: string
}

export interface LocationComponent {
  entity: Entity
  location: Location
}

export interface PositionState {
  current: Option<Location>
  locations: List<LocationComponent>
  focus: Option<GeoCoordinates>
}

export function coordinatesEqual(a: GeoCoordinates, b: GeoCoordinates): boolean {
  return a.latitude === b.latitude && a.longitude === b.longitude
}

export function exactLocation(focus: GeoCoordinates, locations: List<LocationComponent>): Option<LocationComponent> {
  return locations.find((l) => coordinatesEqual(focus, l.location.coordinates))
}

export function nearestLocation(focus: GeoCoordinates, locations: List<LocationComponent>): Option<LocationComponent> {
  let squaredDiff = Number.MAX_VALUE
  let result: Option<LocationComponent> = Option.none()
  locations.map((l) => {
    const latDiff = l.location.coordinates.latitude - focus.latitude
    const lngDiff = l.location.coordinates.longitude - focus.longitude
    const diff = latDiff * latDiff + lngDiff * lngDiff
    if (diff < squaredDiff) {
      squaredDiff = diff
      result = Option.some(l)
    }
  })
  return result
}

export const initialState = (): PositionState => ({ current: Option.none(), locations: List.empty(), focus: Option.none() })

export const position = (state: PositionState = initialState(), action: PositionAction): PositionState => {
  return produce(state, (draft) => {
    switch (action.type) {
      case 'POSITION_UPDATED': {
        draft.current = Option.some({
          coordinates: action.coordinates,
          data: action.data,
        })
        break
      }
      case 'LOCATION_ADD': {
        draft.locations = draft.locations.append({
          entity: action.entity,
          location: {
            coordinates: action.coordinates,
            data: action.data,
          },
        })
        break
      }
      case 'LOCATION_DELETE': {
        draft.locations = draft.locations.filter((v) => v.entity !== action.entity)
        break
      }
      case 'LOCATION_FOCUS': {
        draft.focus = Option.some(action.coordinates)
      }
    }
  })
}
