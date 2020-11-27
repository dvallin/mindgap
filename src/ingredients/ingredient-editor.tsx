import produce from 'immer'
import { Option, Try } from 'lazy-space'
import { h } from 'preact'

import { Ingredient } from '.'
import EditField from '../ui/edit-field'

export interface Props {
  updateIngredient: (ingredient: Ingredient) => void
  deleteIngredient: () => void
  ingredient: Ingredient
}

export default (props: Props) => (
  <tr>
    <td>
      <EditField
        value={props.ingredient.name}
        onInput={name =>
          props.updateIngredient(
            produce(props.ingredient, draft => {
              draft.name = name
            })
          )
        }
        inherit
      />
    </td>
    <td>
      <EditField
        placeholder="amount"
        type="number"
        value={Option.of(props.ingredient.value)
          .map(v => v.toString())
          .getOrElse('')}
        onInput={v =>
          props.updateIngredient(
            produce(props.ingredient, draft => {
              draft.value = Try.lift(Number.parseFloat(v))
                .filter(Number.isFinite)
                .getOrElse(undefined)
            })
          )
        }
        inherit
      />
    </td>
    <td>
      <EditField
        placeholder="unit"
        value={Option.of(props.ingredient.unit).getOrElse('')}
        onInput={unit =>
          props.updateIngredient(
            produce(props.ingredient, draft => {
              draft.unit = unit || undefined
            })
          )
        }
        inherit
      />
    </td>
    <td>
      <button onClick={() => props.deleteIngredient()} className="delete" />
    </td>
  </tr>
)
