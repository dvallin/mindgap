import { connect } from 'react-redux'
import { State } from '../store'
import BatchList from './BatchList'

export default connect((state: State) => ({ batches: state.batches.batchCache }))(BatchList)
