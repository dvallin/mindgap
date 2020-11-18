import { connect } from 'react-redux'
import { State } from '../store'
import RecipeList from './RecipeList'

export default connect((state: State) => ({ recipes: state.recipes.recipeCache }))(RecipeList)
