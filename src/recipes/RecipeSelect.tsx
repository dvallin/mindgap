import { connect } from 'react-redux'

import { State } from '../store'
import Select from '../ui/Select'

export default connect((state: State) => ({
  options: Object.entries(state.recipes.recipeCache).map(([key, value]) => ({ id: key, label: value.name })),
}))(Select)
