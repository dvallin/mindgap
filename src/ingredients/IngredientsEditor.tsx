import { Option, Try } from 'lazy-space'
import * as React from 'react'

import { Ingredient } from '.'
import EditField from '../ui/EditField'
import SubmitField from '../ui/SubmitField'

export interface Props {
  addIngredient: (name: string) => void
  updateIngredient: (index: number, ingredient: Ingredient) => void
  ingredients: Ingredient[]
}

export class IngredientsEditor extends React.Component<Props> {
  render(): JSX.Element {
    return (
      <>
        <h4 className="title is-4">Ingredients</h4>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Amount</th>
              <th>Unit</th>
            </tr>
          </thead>
          <tbody>
            {this.props.ingredients.map(({ name, value, unit }, i) => (
              <tr key={i}>
                <td>
                  <EditField value={name} onChange={(v) => this.props.updateIngredient(i, { name: v, value, unit })} />
                </td>
                <td>
                  <EditField
                    placeholder="amount"
                    type="number"
                    value={Option.of(value)
                      .map((v) => v.toString())
                      .getOrElse('')}
                    onChange={(v) =>
                      this.props.updateIngredient(i, {
                        name,
                        value: Try.lift(Number.parseFloat(v)).filter(Number.isFinite).getOrElse(undefined),
                        unit,
                      })
                    }
                  />
                </td>
                <td>
                  <EditField
                    placeholder="unit"
                    value={Option.of(unit).getOrElse('')}
                    onChange={(v) => this.props.updateIngredient(i, { name, value, unit: v || undefined })}
                  />
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td>
                <SubmitField placeholder="add ingredient" onSubmit={(name) => this.props.addIngredient(name)} />
              </td>
              <td></td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      </>
    )
  }
}

export default IngredientsEditor
