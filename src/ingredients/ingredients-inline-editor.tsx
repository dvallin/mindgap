import { h, Fragment } from 'preact'

import { Ingredient } from '.'

import EditField from '../ui/edit-field'
import SubmitField from '../ui/submit-field'

export interface Props {
  addIngredient: (name: string) => void
  updateIngredient: (index: number, ingredient: Ingredient) => void
  deleteIngredient: (index: number) => void
  ingredients: Ingredient[]
}

export default (props: Props) => (
  <Fragment>
    <div className="field is-grouped is-grouped-multiline mb-2">
      {props.ingredients.map(({ name, value, unit }, i) => (
        <span key={i} className="tag mr-1">
          <EditField value={name} onInput={v => props.updateIngredient(i, { name: v, value, unit })} narrow />
          <button className="delete is-small" onClick={() => props.deleteIngredient(i)}></button>
        </span>
      ))}
    </div>
    <SubmitField placeholder="add ingredient" onSubmit={name => props.addIngredient(name)} />
  </Fragment>
)
