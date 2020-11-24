import { h, Fragment } from 'preact'

import { Step, empty } from '.'
import { eventValue } from '../preact-helpers'
import StepEditor from './step-editor'

export interface Props {
  steps: Step[]
  addStep: (step: Step) => void
  updateStep: (index: number, step: Step) => void
}

export default (props: Props) => (
  <Fragment>
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
          {props.steps.map((step, i) => {
            return (
              <tr key={i}>
                <td>
                  <div className="select">
                    <select
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
                <StepEditor step={step} updateStep={step => props.updateStep(i, step)} />
              </tr>
            )
          })}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={3}>
              <button className="button is-info" onClick={() => props.addStep(empty('addition'))}>
                add
              </button>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  </Fragment>
)
