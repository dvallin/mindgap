import { Option } from 'lazy-space'
import * as React from 'react'
import { Link } from 'react-router-dom'

import { Batch } from '../batches'
import { daysAgo, Id } from '../common'

export interface Props {
  batches: { [id in Id]: Batch }
}

export class BatchList extends React.Component<Props> {
  renderBatch(id: Id): JSX.Element {
    const batch = this.props.batches[id]
    return (
      <article className="media" key={id}>
        <Link to={`/batches/${id}`} style={{ color: 'inherit', textDecoration: 'inherit' }}>
          <div className="media-content">
            <div className="content">
              <p>
                <strong>{batch.name}</strong>{' '}
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
      .sort((l, r) => l[1].date.localeCompare(r[1].date))
      .map(([id]) => this.renderBatch(id))
    return <div className="box">{batches}</div>
  }
}

export default BatchList
