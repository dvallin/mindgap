import { Option } from 'lazy-space'
import * as React from 'react'
import { Link } from 'react-router-dom'

import { Batch } from '../batches'
import { daysAgo, Id, matches } from '../common'
import CreateBatch from './CreateBatch'

export interface Props {
  batches: { [id in Id]: Batch }
}

export interface ComponentState {
  filter: string
}

export class BatchList extends React.Component<Props, ComponentState> {
  readonly state: ComponentState = { filter: '' }

  renderBatch(id: Id): JSX.Element {
    const batch = this.props.batches[id]
    return (
      <article className="media" key={id}>
        <Link to={`/batches/${id}`} style={{ color: 'inherit', textDecoration: 'inherit' }}>
          <div className="media-content">
            <div className="content">
              <p>
                <strong>{batch.name || 'unnamed batch'}</strong>{' '}
                {Option.of(batch.done).unwrap(
                  (done) => (
                    <small>finished {daysAgo(done)} days ago</small>
                  ),
                  () => (
                    <small>started {daysAgo(batch.date)} days ago</small>
                  )
                )}
                <br />
                {batch.description}
              </p>
            </div>
          </div>
        </Link>
      </article>
    )
  }

  render(): JSX.Element {
    const batches = Object.entries(this.props.batches)
      .filter(([_, recipe]) => matches(recipe, ['name', 'description'], this.state.filter))
      .sort((l, r) => l[1].date.localeCompare(r[1].date))
      .map(([id]) => this.renderBatch(id))
    return (
      <>
        <div className="field is-grouped">
          <p className="control is-expanded">
            <input
              className="input"
              value={this.state.filter}
              onChange={(e) => this.setState({ filter: e.target.value })}
              placeholder="search"
            />
          </p>
          <p className="control">
            <CreateBatch />
          </p>
        </div>
        <div className="box">{batches}</div>
      </>
    )
  }
}

export default BatchList
