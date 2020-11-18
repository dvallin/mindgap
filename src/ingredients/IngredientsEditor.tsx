import produce from 'immer'
import { Option, Try } from 'lazy-space'
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

export class IngredientsEditor extends React.Component<Props> {
  renderIngredient(index: number, ingredient: Ingredient): JSX.Element {
    return (
      <tr key={index}>
        <td>
          <EditField
            value={ingredient.name}
            onChange={(name) =>
              this.props.updateIngredient(
                index,
                produce(ingredient, (draft) => {
                  draft.name = name
                })
              )
            }
          />
        </td>
        <td>
          <EditField
            placeholder="amount"
            type="number"
            value={Option.of(ingredient.value)
              .map((v) => v.toString())
              .getOrElse('')}
            onChange={(v) =>
              this.props.updateIngredient(
                index,
                produce(ingredient, (draft) => {
                  draft.value = Try.lift(Number.parseFloat(v)).filter(Number.isFinite).getOrElse(undefined)
                })
              )
            }
          />
        </td>
        <td>
          <EditField
            placeholder="unit"
            value={Option.of(ingredient.unit).getOrElse('')}
            onChange={(unit) =>
              this.props.updateIngredient(
                index,
                produce(ingredient, (draft) => {
                  draft.unit = unit || undefined
                })
              )
            }
          />
        </td>
        <td>
          <button onClick={() => this.props.deleteIngredient(index)} className="delete" />
        </td>
      </tr>
    )
  }

  render(): JSX.Element {
    return (
      <>
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
            <tbody>{this.props.ingredients.map((ingredient, index) => this.renderIngredient(index, ingredient))}</tbody>
            <tfoot>
              <tr>
                <td colSpan={3}>
                  <SubmitField placeholder="name" buttonText="Add Ingredient" onSubmit={(name) => this.props.addIngredient(name)} />
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </>
    )
  }
}

export default IngredientsEditor
