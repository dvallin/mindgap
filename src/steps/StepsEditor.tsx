import produce from 'immer'
import * as React from 'react'

import { Step, empty } from '.'
import IngredientsInlineEditor from '../ingredients/IngredientsInlineEditor'
import EditField from '../ui/EditField'
import EditText from '../ui/EditText'

export interface Props {
  steps: Step[]
  addStep: (step: Step) => void
  updateStep: (index: number, step: Step) => void
}

export class StepsEditor extends React.Component<Props> {
  renderStep(index: number, step: Step): JSX.Element {
    const note = (
      <EditText value={step.note} placeholder="note" onChange={(value) => this.props.updateStep(index, { ...step, note: value })} />
    )
    switch (step.kind) {
      case 'addition':
        return (
          <>
            <td>
              <IngredientsInlineEditor
                ingredients={step.ingredients}
                addIngredient={(name) => {
                  this.props.updateStep(
                    index,
                    produce(step, (draft) => {
                      draft.ingredients.push({ name })
                    })
                  )
                }}
                updateIngredient={(i, ingredient) => {
                  this.props.updateStep(
                    index,
                    produce(step, (draft) => {
                      draft.ingredients[i] = ingredient
                    })
                  )
                }}
                deleteIngredient={(i) => {
                  this.props.updateStep(
                    index,
                    produce(step, (draft) => {
                      draft.ingredients.splice(i, 1)
                    })
                  )
                }}
              />
            </td>
            <td>{note}</td>
          </>
        )
      case 'observation':
      case 'manipulation':
        return <td colSpan={2}>{note}</td>
      case 'measurement':
        return (
          <>
            <td>{note}</td>
            <td>
              <EditField value={step.value} onChange={(value) => this.props.updateStep(index, { ...step, value })} narrow />
              <EditField value={step.unit} onChange={(unit) => this.props.updateStep(index, { ...step, unit })} narrow />
            </td>
          </>
        )
      case 'wait':
        return (
          <>
            <td>
              <EditField value={step.duration} onChange={(duration) => this.props.updateStep(index, { ...step, duration })} />
            </td>
            <td>{note}</td>
          </>
        )
    }
  }

  render(): JSX.Element {
    return (
      <>
        <h4 className="title is-4">Steps</h4>
        <div className="box">
          <table className="table">
            <thead>
              <tr>
                <th>Type</th>
                <th colSpan={2}>Step</th>
              </tr>
            </thead>
            <tbody>
              {this.props.steps.map((step, i) => {
                return (
                  <tr key={i}>
                    <td>
                      <div className="select">
                        <select
                          value={step.kind}
                          onChange={(e) => this.props.updateStep(i, { ...empty(e.target.value as Step['kind']), note: step.note })}
                        >
                          <option value="addition">Addition</option>
                          <option value="manipulation">Manipulation</option>
                          <option value="measurement">Measurement</option>
                          <option value="observation">Observation</option>
                          <option value="wait">Wait</option>
                        </select>
                      </div>
                    </td>
                    {this.renderStep(i, step)}
                  </tr>
                )
              })}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={3}>
                  <button className="button is-info" onClick={() => this.props.addStep(empty('addition'))}>
                    Add Step
                  </button>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </>
    )
  }
}

export default StepsEditor
