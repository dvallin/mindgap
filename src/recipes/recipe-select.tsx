import { h } from 'preact'
import { useApplicationState } from '../state'

import Select, { Props } from '../ui/select'

export default (props: Omit<Props, 'options'>) => {
  const [state] = useApplicationState()
  return <Select {...props} options={Object.entries(state.recipes).map(([key, value]) => ({ id: key, label: value.name }))} />
}
