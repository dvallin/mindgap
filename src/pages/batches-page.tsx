import { Fragment, h } from 'preact'
import { Option } from 'lazy-space'

import ActiveBatches from '../batches/list/active'
import AllBatches from '../batches/list/all'
import DoneBatches from '../batches/list/done'
import { PageProps } from '.'

export interface Props {
  done?: string
}

export default (props: Props & PageProps) => {
  const isDone = Option.of(props.done).map(v => v === 'true')
  const body = isDone.unwrap(
    done =>
      done ? (
        <Fragment>
          <h1 className="title">Done Batches</h1>
          <DoneBatches />
        </Fragment>
      ) : (
        <Fragment>
          <h1 className="title">Active Batches</h1>
          <ActiveBatches />
        </Fragment>
      ),
    () => (
      <Fragment>
        <h1 className="title">All Batches</h1>
        <AllBatches />
      </Fragment>
    )
  )
  return <section className="section">{body}</section>
}
