import * as React from 'react'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import { LeafletMouseEvent } from 'leaflet'
import { Option, List } from 'lazy-space'
import { GeoCoordinates, locationAddAction, LocationComponent } from './state'
import Services, { injectServices } from '../Services'
import { State, Dispatch } from '../store'
import { connect } from 'react-redux'
import { v4 } from 'uuid'
import { entityCreateAction } from '../entities/state'

export interface InnerProps {
  focus: Option<GeoCoordinates>
  locationComponents: List<LocationComponent>
}

export interface Callbacks {
  addLocation: (position: GeoCoordinates) => void
}

export type Props = InnerProps & Callbacks

export class LocationMap extends React.Component<Props> {
  onClick(e: LeafletMouseEvent): void {
    this.props.addLocation({
      latitude: e.latlng.lat,
      longitude: e.latlng.lng,
    })
  }

  render(): JSX.Element {
    const position = this.props.focus
      .map((p) => ({
        lat: p.latitude,
        lng: p.longitude,
      }))
      .recover(() => ({ lat: 0, lng: 0 }))

    const markers = this.props.locationComponents
      .map((c) => {
        const position = {
          lat: c.location.coordinates.latitude,
          lng: c.location.coordinates.longitude,
        }
        return (
          <Marker key={c.entity} position={position}>
            <Popup>{c.location.data}</Popup>
          </Marker>
        )
      })
      .toArray()

    return (
      <Map center={position} zoom={20} onclick={(e) => this.onClick(e)}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {markers}
      </Map>
    )
  }
}

export const stateToProps = (state: State): InnerProps => ({
  focus: state.position.focus,
  locationComponents: state.position.locations,
})

export const dispatchToProps = (dispatch: Dispatch, services: Services): Callbacks => ({
  addLocation: (coordinates) =>
    services.geocodingService
      .getDisplayName(coordinates)
      .recover(() => 'unkown location')
      .map((data) => {
        const entity = v4()
        dispatch(entityCreateAction(entity))
        dispatch(locationAddAction(entity, coordinates, data))
      }),
})

export default injectServices(connect(stateToProps, dispatchToProps)(LocationMap))
