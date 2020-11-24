import { Fragment, h } from 'preact'
import { useState } from 'preact/hooks'

import { Id, matches } from '../../common'
import CreateBatch from '../create'
import BatchListItem from './list-item'
import { eventValue } from '../../preact-helpers'
import { Batch } from '..'

export interface Props {
  batches: { [id in Id]: Batch }
}

export default (props: Props) => {
  const [filter, setFilter] = useState('')
  const batches = Object.entries(props.batches)
    .filter(([_, recipe]) => matches(recipe, ['name', 'description'], filter))
    .sort((l, r) => l[1].date.localeCompare(r[1].date))
    .map(([id, batch]) => <BatchListItem key={id} batchId={id} batch={batch} />)
  return (
    <Fragment>
      <div className="field is-grouped">
        <p className="control is-expanded">
          <input className="input" value={filter} onInput={e => eventValue(e).map(setFilter)} placeholder="search" />
        </p>
        <p className="control">
          <CreateBatch />
        </p>
      </div>
      <div className="box">{batches}</div>
    </Fragment>
  )
}
