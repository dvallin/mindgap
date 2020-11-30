import { h, Fragment } from 'preact'

import { Ingredient } from '.'
import SubmitField from '../ui/submit-field'
import IngredientEditor from './ingredient-editor'

export interface Props {
  addIngredient: (name: string) => void
  updateIngredient: (index: number, ingredient: Ingredient) => void
  deleteIngredient: (index: number) => void
  ingredients: Ingredient[]
}

export default (props: Props) => (
  <Fragment>
    <h4 className="title is-4">Ingredients</h4>
    {props.ingredients.map((ingredient, index) => (
      <IngredientEditor
        key={index}
        ingredient={ingredient}
        updateIngredient={i => props.updateIngredient(index, i)}
        deleteIngredient={() => props.deleteIngredient(index)}
      />
    ))}
    <hr />
    <SubmitField placeholder="name" buttonText="add" onSubmit={name => props.addIngredient(name)} />
  </Fragment>
)
