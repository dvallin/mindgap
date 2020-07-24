import * as React from 'react'

import LocationMap from './map/LocationMap'
import LocationList from './map/LocationList'

import { Nav, Container, Row, Col } from 'react-bootstrap'
import FocusedLocationDetails from './map/FocusedLocationDetails'

export class App extends React.Component {
  render(): JSX.Element {
    return (
      <>
        <Nav defaultActiveKey="/home" as="ul">
          <Nav.Item as="li">
            <Nav.Link href="/home">Active</Nav.Link>
          </Nav.Item>
          <Nav.Item as="li">
            <Nav.Link eventKey="link-1">Link</Nav.Link>
          </Nav.Item>
          <Nav.Item as="li">
            <Nav.Link eventKey="link-2">Link</Nav.Link>
          </Nav.Item>
        </Nav>
        <Container fluid>
          <Row>
            <Col sm={8}>
              <LocationMap />
            </Col>
            <Col sm={4}>
              <LocationList />
            </Col>
          </Row>
          <Row>
            <Col>
              <FocusedLocationDetails />
            </Col>
          </Row>
        </Container>
      </>
    )
  }
}

export default App
