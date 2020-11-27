import { h, Fragment } from 'preact'

import { Step, empty } from '.'
import { eventValue } from '../preact-helpers'
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
    <div className="box">
      <table className="table">
        <thead>
          <tr>
            <th>Type</th>
            <th colSpan={3}>Step</th>
          </tr>
        </thead>
        <tbody>
          {props.steps.map((step, i) => {
            return (
              <tr key={i}>
                <td>
                  <div className="select">
                    <select
                      disabled={props.disabled}
                      value={step.kind}
                      onChange={e => eventValue(e).map(v => props.updateStep(i, { ...empty(v as Step['kind']), note: step.note }))}
                    >
                      <option value="addition">Addition</option>
                      <option value="manipulation">Manipulation</option>
                      <option value="measurement">Measurement</option>
                      <option value="observation">Observation</option>
                      <option value="wait">Wait</option>
                    </select>
                  </div>
                </td>
                <StepEditor disabled={props.disabled} step={step} updateStep={step => props.updateStep(i, step)} />
                <td>
                  <button onClick={() => props.deleteStep(i)} className="delete" />
                </td>
              </tr>
            )
          })}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={4}>
              <button disabled={props.disabled} className="button is-info" onClick={() => props.addStep(empty('addition'))}>
                add
              </button>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  </Fragment>
)
