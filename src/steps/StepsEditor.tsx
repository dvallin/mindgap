import * as React from 'react'

import { Step, empty } from '.'
import EditField from '../ui/EditField'
import SubmitField from '../ui/SubmitField'

export default (props: { steps: Step[]; addStep: (step: Step) => void; updateStep: (index: number, step: Step) => void }): JSX.Element => (
  <>
    <h4 className="title is-4">Steps</h4>
    <table className="table">
      <thead>
        <tr>
          <th>Type</th>
          <th>Note</th>
          <th>Step</th>
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
                    onChange={(e) => {
                      props.updateStep(i, { ...empty(e.target.value as Step['kind']), note: step.note })
                    }}
                  >
                    <option value="addition">Addition</option>
                    <option value="manipulation">Manipulation</option>
                    <option value="measurement">Measurement</option>
                    <option value="observation">Observation</option>
                  </select>
                </div>
              </td>
              <td>
                <EditField value={step.note} placeholder="note" onChange={(value) => props.updateStep(i, { ...step, note: value })} />
              </td>
              <td>...</td>
            </tr>
          )
        })}
      </tbody>
      <tfoot>
        <tr>
          <td>
            <SubmitField placeholder="add step" onSubmit={(note) => props.addStep({ ...empty('observation'), note })} />
          </td>
          <td></td>
          <td></td>
        </tr>
      </tfoot>
    </table>
  </>
)
