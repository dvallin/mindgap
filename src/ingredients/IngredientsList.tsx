import * as React from 'react'

import { Ingredient } from '.'

export interface Props {
  ingredients: Ingredient[]
}

export default (props: Props): JSX.Element => (
  <>
    <h4 className="title is-4">Ingredients</h4>
    <table className="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        {props.ingredients.map(({ name, value, unit }, i) => (
          <tr key={i}>
            <td>{name}</td>
            <td>
              {value} {unit}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </>
)
