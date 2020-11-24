import { h } from 'preact'

import { useApplicationState } from '../../state'
import List, { Props } from '.'

export default () => {
  const [state] = useApplicationState()
  const batches: Props['batches'] = {}
  Object.entries(state.batches)
    .filter(([_, value]) => !value.done)
    .forEach(([key, value]) => {
      batches[key] = value
    })
  return <List batches={batches} />
}
