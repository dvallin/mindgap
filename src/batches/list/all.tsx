import { h } from 'preact'

import { useApplicationState } from '../../state'
import List from '.'

export default () => {
  const [state] = useApplicationState()
  return <List batches={state.batches} />
}
