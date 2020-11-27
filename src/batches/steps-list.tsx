import { Fragment, h } from 'preact'

import { Step } from '../steps'
import IngredientsInline from '../ingredients/inline-list'

export interface Props {
  steps: Step[]
  disabled?: boolean
  onSelect: (step: Step) => void
}

export default (props: Props) => (
  <Fragment>
    <h4 className="title is-4">Steps</h4>
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
        <a disabled={props.disabled} key={i} onClick={() => props.onSelect(step)} class="panel-block button">
          {body}
          <div>{step.note}</div>
        </a>
      )
    })}
  </Fragment>
)
