import { h, Fragment } from 'preact'

import { Step, empty } from '.'
import StepEditor from './step-editor'

export interface Props {
  steps: Step[]
  disabled?: boolean
  addStep: (step: Step) => void
  updateStep: (index: number, step: Step) => void
  deleteStep: (index: number) => void
}

export default (props: Props) => (
  <Fragment>
    <h4 className="title is-4">Steps</h4>
    {props.steps.map((step, i) => {
      return (
        <StepEditor
          key={i}
          disabled={props.disabled}
          step={step}
          updateStep={step => props.updateStep(i, step)}
          deleteStep={() => props.deleteStep(i)}
        />
      )
    })}
    <button disabled={props.disabled} className="button is-info" onClick={() => props.addStep(empty('addition'))}>
      add
    </button>
    <hr />
  </Fragment>
)
