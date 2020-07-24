import * as React from 'react'
import { List, Option } from 'lazy-space'
import {
  Location,
  GeoCoordinates,
  locationFocusAction,
  positionUpdatedAction,
  locationDeleteAction,
  coordinatesEqual,
  LocationComponent,
} from './state'
import { State, Dispatch } from '../store'
import { connect } from 'react-redux'
import Services, { injectServices } from '../Services'
import { ListGroup, Button, Container, Row, Col } from 'react-bootstrap'

export interface InnerProps {
  locationComponents: List<LocationComponent>
  current: Option<Location>
  focus: Option<GeoCoordinates>
}

export interface Callbacks {
  focusCoordinates: (coordinates: GeoCoordinates) => void
  deleteLocation: (id: string) => void
  watchCurrentCoordinates: () => void
}

export type Props = InnerProps & Callbacks

function round(num: number, precision = 2): number {
  const p = Math.pow(10, precision)
  return Math.round((num + Number.EPSILON) * p) / p
}

export class LocationList extends React.Component<Props> {
  componentDidMount(): void {
    this.props.watchCurrentCoordinates()
  }

  renderLocation(id: string, location: Location, canDelete: boolean): JSX.Element {
    const { coordinates, data } = location
    const isFocus = this.props.focus.map((f) => coordinatesEqual(f, location.coordinates)).recover(() => false)
    return (
      <ListGroup.Item active={isFocus}>
        <Container>
          <Row>
            <Col onClick={() => this.props.focusCoordinates(coordinates)}>
              {data} ({round(coordinates.latitude, 5)},{round(coordinates.longitude, 5)})
            </Col>
            <Col sm={2}>
              {canDelete && (
                <Button variant="danger" onClick={() => this.props.deleteLocation(id)}>
                  X
                </Button>
              )}
            </Col>
          </Row>
        </Container>
      </ListGroup.Item>
    )
  }

  render(): JSX.Element {
    return (
      <>
        <ListGroup>
          {this.props.current.map((location) => this.renderLocation('current', location, false)).recover(() => undefined)}
          {this.props.locationComponents.map((c) => this.renderLocation(c.entity, c.location, true)).toArray()}
        </ListGroup>
      </>
    )
  }
}

export const stateToProps = (state: State): InnerProps => ({
  locationComponents: state.position.locations,
  current: state.position.current,
  focus: state.position.focus,
})

export const dispatchToProps = (dispatch: Dispatch, services: Services): Callbacks => ({
  watchCurrentCoordinates: () =>
    services.positionService.watch((result) =>
      result
        .map((p) => ({ latitude: p.coords.latitude, longitude: p.coords.longitude }))
        .map((coordinates) => dispatch(positionUpdatedAction(coordinates, 'current location')))
    ),
  focusCoordinates: (coordinates) => dispatch(locationFocusAction(coordinates)),
  deleteLocation: (coordinates) => dispatch(locationDeleteAction(coordinates)),
})

export default injectServices(connect(stateToProps, dispatchToProps)(LocationList))
