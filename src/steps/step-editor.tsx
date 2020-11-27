import { Fragment, h } from 'preact'
import { produce } from 'immer'

import { Step } from '.'
import IngredientsInlineEditor from '../ingredients/ingredients-inline-editor'
import EditField from '../ui/edit-field'
import EditText from '../ui/edit-text'

export interface Props {
  step: Step
  disabled?: boolean
  updateStep: (step: Step) => void
}

export default (props: Props) => {
  const { step } = props
  const note = (
    <EditText
      disabled={props.disabled}
      value={props.step.note}
      placeholder="note"
      onInput={value =>
        props.updateStep(
          produce(props.step, s => {
            s.note = value
          })
        )
      }
    />
  )
  switch (step.kind) {
    case 'addition':
      return (
        <Fragment>
          <td>
            <IngredientsInlineEditor
              disabled={props.disabled}
              ingredients={step.ingredients}
              addIngredient={name => {
                props.updateStep(
                  produce(step, draft => {
                    draft.ingredients.push({ name })
                  })
                )
              }}
              updateIngredient={(i, ingredient) => {
                props.updateStep(
                  produce(step, draft => {
                    draft.ingredients[i] = ingredient
                  })
                )
              }}
              deleteIngredient={i => {
                props.updateStep(
                  produce(step, draft => {
                    draft.ingredients.splice(i, 1)
                  })
                )
              }}
            />
          </td>
          <td>{note}</td>
        </Fragment>
      )
    case 'observation':
    case 'manipulation':
      return <td colSpan={2}>{note}</td>
    case 'measurement':
      return (
        <Fragment>
          <td>{note}</td>
          <td>
            <EditField
              disabled={props.disabled}
              value={step.value}
              placeholder="value"
              onInput={value =>
                props.updateStep(
                  produce(step, d => {
                    d.value = value
                  })
                )
              }
              inherit
              narrow
            />
            <EditField
              disabled={props.disabled}
              value={step.unit}
              placeholder="unit"
              onInput={unit =>
                props.updateStep(
                  produce(step, d => {
                    d.unit = unit
                  })
                )
              }
              inherit
              narrow
            />
          </td>
        </Fragment>
      )
    case 'wait':
      return (
        <Fragment>
          <td>
            <EditField
              disabled={props.disabled}
              value={step.duration}
              placeholder="duration"
              onInput={duration =>
                props.updateStep(
                  produce(step, d => {
                    d.duration = duration
                  })
                )
              }
              inherit
              narrow
            />
          </td>
          <td>{note}</td>
        </Fragment>
      )
  }
}
