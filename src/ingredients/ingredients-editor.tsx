import { h, Fragment } from 'preact'

import { Ingredient } from '.'
import IngredientEditor from './ingredient-editor'
import SubmitField from '../ui/submit-field'

export interface Props {
  addIngredient: (name: string) => void
  updateIngredient: (index: number, ingredient: Ingredient) => void
  deleteIngredient: (index: number) => void
  ingredients: Ingredient[]
}

export default (props: Props) => (
  <Fragment>
    <h4 className="title is-4">Ingredients</h4>
    <div className="box">
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Amount</th>
            <th colSpan={2}>Unit</th>
          </tr>
        </thead>
        <tbody>
          {props.ingredients.map((ingredient, index) => (
            <IngredientEditor
              key={index}
              ingredient={ingredient}
              updateIngredient={updated => props.updateIngredient(index, updated)}
              deleteIngredient={() => props.deleteIngredient(index)}
            />
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={3}>
              <SubmitField placeholder="name" buttonText="add" onSubmit={name => props.addIngredient(name)} />
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  </Fragment>
)
