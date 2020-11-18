import { connect } from 'react-redux'
import { State } from '../store'
import BatchList from './BatchList'

export default connect((state: State) => {
  const batches = {}
  Object.entries(state.batches.batchCache)
    .filter(([_, value]) => value.done)
    .forEach(([key, value]) => {
      batches[key] = value
    })
  return { batches }
})(BatchList)
