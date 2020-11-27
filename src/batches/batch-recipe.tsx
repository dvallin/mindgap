import { h, Fragment } from 'preact'

import { Recipe } from '../recipes'

import Name from '../name/name'
import IngredienstList from '../ingredients/list'
import StepsList from './steps-list'
import { Step } from '../steps'

export interface Props {
  recipe: Recipe
  disabled?: boolean
  onStepSelect: (step: Step) => void
}

export default (props: Props) => (
  <Fragment>
    <Name name={props.recipe} />
    <div className="content">
      <IngredienstList ingredients={props.recipe.ingredients} />
      <StepsList disabled={props.disabled} steps={props.recipe.steps} onSelect={props.onStepSelect} />
    </div>
  </Fragment>
)
