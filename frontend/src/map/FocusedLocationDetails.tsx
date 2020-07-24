import * as React from 'react'
import { Option } from 'lazy-space'
import { exactLocation, LocationComponent } from './state'
import { State } from '../store'
import { connect } from 'react-redux'

export interface InnerProps {
  focus: Option<LocationComponent>
}

export type Props = InnerProps

export const FocusedLocationDetails = (props: Props): JSX.Element =>
  props.focus.unwrap(
    (focus) => <div>{focus.entity}</div>,
    () => <></>
  )

export const stateToProps = (state: State): InnerProps => ({
  focus: state.position.focus.flatMap((f) => exactLocation(f, state.position.locations)),
})

export default connect(stateToProps)(FocusedLocationDetails)
