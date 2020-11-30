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

export default (props: Props) => {
  const { ingredient, updateIngredient } = props
  return (
    <div class="columns is-mobile">
      <div class="column is-4-mobile">
        <EditField
          value={ingredient.name}
          onInput={name =>
            updateIngredient(
              produce(ingredient, draft => {
                draft.name = name
              })
            )
          }
          inherit
        />
      </div>
      <div class="column is-3-mobile">
        <EditField
          placeholder="value"
          type="number"
          value={Option.of(ingredient.value)
            .map(v => v.toString())
            .getOrElse('')}
          onInput={v =>
            updateIngredient(
              produce(ingredient, draft => {
                draft.value = Try.lift(Number.parseFloat(v))
                  .filter(Number.isFinite)
                  .getOrElse(undefined)
              })
            )
          }
          inherit
        />
      </div>
      <div class="column is-3-mobile">
        <EditField
          placeholder="unit"
          value={Option.of(ingredient.unit).getOrElse('')}
          onInput={unit =>
            updateIngredient(
              produce(ingredient, draft => {
                draft.unit = unit || undefined
              })
            )
          }
          inherit
        />
      </div>
      <div class="column is-2-mobile">
        <button className="delete" onClick={props.deleteIngredient} />
      </div>
    </div>
  )
}
