import { Fragment, h } from 'preact'
import { produce } from 'immer'

import { Step, empty } from '.'
import IngredientsInlineEditor from '../ingredients/ingredients-inline-editor'
import EditField from '../ui/edit-field'
import EditText from '../ui/edit-text'
import { eventValue } from '../preact-helpers'

export interface Props {
  step: Step
  disabled?: boolean
  updateStep: (step: Step) => void
  deleteStep: () => void
}

export default (props: Props) => {
  const { step } = props

  let content = undefined
  switch (step.kind) {
    case 'addition':
      content = (
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
      )
      break
    case 'measurement':
      content = (
        <Fragment>
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
        </Fragment>
      )
      break
    case 'wait':
      content = (
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
        />
      )
      break
  }

  return (
    <Fragment>
      <div class="columns is-multiline is-mobile">
        <div class="column is-10">
          <div className="select">
            <select
              disabled={props.disabled}
              value={step.kind}
              onChange={e => eventValue(e).map(v => props.updateStep({ ...empty(v as Step['kind']), note: step.note }))}
            >
              <option value="addition">Addition</option>
              <option value="manipulation">Manipulation</option>
              <option value="measurement">Measurement</option>
              <option value="observation">Observation</option>
              <option value="wait">Wait</option>
            </select>
          </div>
        </div>
        <div class="column is-2">
          <button onClick={() => props.deleteStep()} className="delete" />
        </div>
        {content !== undefined ? <div class="column is-full-mobile">{content}</div> : undefined}
        <div class="column is-full-mobile">
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
        </div>
      </div>
      <hr />
    </Fragment>
  )
}
