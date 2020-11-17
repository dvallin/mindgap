import * as React from 'react'

import { Step } from '.'
import IngredientsInline from '../ingredients/IngredientsInline'

export default (props: { steps: Step[] }): JSX.Element => (
  <>
    <h4 className="title is-4">Steps</h4>
    <table className="table">
      <tbody>
        {props.steps.map((step, i) => {
          let body: JSX.Element
          switch (step.kind) {
            case 'addition':
              body = (
                <>
                  <span>Add </span>
                  <IngredientsInline {...step} />
                </>
              )
              break
            default:
              body = <>{step.kind}</>
              break
          }
          return (
            <tr key={i}>
              <td>
                {body}
                <div>{step.note}</div>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  </>
)
