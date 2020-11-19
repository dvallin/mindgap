import * as React from 'react'
import { connect } from 'react-redux'
import { RouteChildrenProps, withRouter } from 'react-router'
import { v4 } from 'uuid'
import { batch } from '.'
import { Dispatch } from '../store'
import { addBatch } from './state'

export interface Callbacks {
  add(): void
}

export type Props = Callbacks & RouteChildrenProps

export const CreateBatch = (props: Props): JSX.Element => {
  return (
    <button className="button is-info" onClick={props.add}>
      <span>new batch</span>
      <span className="icon is-small">
        <i className="fas fa-plus" aria-hidden="true"></i>
      </span>
    </button>
  )
}

export const dispatchToProps = (dispatch: Dispatch, props: RouteChildrenProps): Callbacks => ({
  add: () => {
    const id = v4()
    dispatch(addBatch(id, batch()))
    props.history.push(`/batches/${id}`)
  },
})

export default withRouter(connect((i) => i, dispatchToProps)(CreateBatch))
