import { Fragment, h } from 'preact'

import { Step } from '.'
import IngredientsInline from '../ingredients/inline-list'

export interface Props {
  steps: Step[]
}

export default (props: Props) => (
  <Fragment>
    <h4 className="title is-4">Steps</h4>
    <table className="table">
      <tbody>
        {props.steps.map((step, i) => {
          let body: JSX.Element
          switch (step.kind) {
            case 'addition':
              body = (
                <Fragment>
                  <span>Add </span>
                  <IngredientsInline {...step} />
                </Fragment>
              )
              break
            default:
              body = <Fragment>{step.kind}</Fragment>
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
  </Fragment>
)
