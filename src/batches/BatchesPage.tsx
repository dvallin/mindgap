import { Option } from 'lazy-space'
import * as React from 'react'
import { RouteChildrenProps } from 'react-router'
import ActiveBatches from './ActiveBatches'
import AllBatches from './AllBatches'
import DoneBatches from './DoneBatches'

export default (props: RouteChildrenProps): JSX.Element => {
  const isDone = Option.of(new URLSearchParams(props.location.search).get('done')).map((v) => v === 'true')
  const body = isDone.unwrap(
    (done) =>
      done ? (
        <>
          <h1 className="title">Done Batches</h1>
          <DoneBatches />
        </>
      ) : (
        <>
          <h1 className="title">Active Batches</h1>
          <ActiveBatches />
        </>
      ),
    () => (
      <>
        <h1 className="title">All Batches</h1>
        <AllBatches />
      </>
    )
  )
  return <section className="section">{body}</section>
}
