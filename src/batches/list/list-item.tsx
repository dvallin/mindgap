import { h } from 'preact'
import { Option } from 'lazy-space'

import { Batch } from '..'
import { daysAgo, Id } from '../../common'
import Link from '../../link'

export interface Props {
  batchId: Id
  batch: Batch
}

export default (props: Props) => {
  const { batch, batchId } = props
  return (
    <article className="media">
      <Link path={`/batches/${batchId}`} inherit>
        <div className="media-content">
          <div className="content">
            <p>
              <strong>{batch.name || 'unnamed batch'}</strong>{' '}
              {Option.of(batch.done).unwrap(
                done => (
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
