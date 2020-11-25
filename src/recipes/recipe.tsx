import { h, Fragment } from 'preact'

import { Recipe } from '.'

import Name from '../name/name'
import IngredienstList from '../ingredients/list'
import StepsList from '../steps/list'

export interface Props {
  recipe: Recipe
}

export default (props: Props) => (
  <Fragment>
    <Name name={props.recipe} />
    <div className="content">
      <IngredienstList ingredients={props.recipe.ingredients} />
      <StepsList steps={props.recipe.steps} />
    </div>
  </Fragment>
)
