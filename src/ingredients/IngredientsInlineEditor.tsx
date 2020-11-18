import * as React from 'react'

import { Ingredient } from '.'
import EditField from '../ui/EditField'
import SubmitField from '../ui/SubmitField'

export interface Props {
  addIngredient: (name: string) => void
  updateIngredient: (index: number, ingredient: Ingredient) => void
  deleteIngredient: (index: number) => void
  ingredients: Ingredient[]
}

export class IngredientsInlineEditor extends React.Component<Props> {
  render(): JSX.Element {
    return (
      <>
        <div className="field is-grouped is-grouped-multiline mb-2">
          {this.props.ingredients.map(({ name, value, unit }, i) => (
            <span key={i} className="tag mr-1">
              <EditField value={name} onChange={(v) => this.props.updateIngredient(i, { name: v, value, unit })} narrow />
              <button className="delete is-small" onClick={() => this.props.deleteIngredient(i)}></button>
            </span>
          ))}
        </div>
        <SubmitField placeholder="add ingredient" onSubmit={(name) => this.props.addIngredient(name)} />
      </>
    )
  }
}

export default IngredientsInlineEditor
