import { h } from 'preact'
import { Link } from 'preact-router'
import { Option } from 'lazy-space'

import { Batch } from '..'
import { daysAgo, Id } from '../../common'

export interface Props {
  batchId: Id
  batch: Batch
}

export default (props: Props) => {
  const { batch, batchId } = props
  return (
    <article className="media">
      <Link href={`/batches/${batchId}`} style={{ color: 'inherit', textDecoration: 'inherit' }}>
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
