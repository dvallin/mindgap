import { h } from 'preact'
import { v4 } from 'uuid'

import { batch, addBatch } from '.'
import { route } from '../path'
import { useApplicationState } from '../state'

export default () => {
  const [, mutate] = useApplicationState()
  return (
    <button
      className="button is-info"
      onClick={() => {
        const id = v4()
        mutate(addBatch(id, batch()))
        route(`/batches/${id}`)
      }}
    >
      <span>new batch</span>
      <span className="icon is-small">
        <i className="fas fa-plus" aria-hidden="true"></i>
      </span>
    </button>
  )
}
