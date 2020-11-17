import * as React from 'react'

import { Recipe } from '.'

import Name from '../common/Name'
import IngredientList from '../ingredients/IngredientsList'
import StepsList from '../steps/StepsList'

export interface Callbacks {
  addIngredient: (name: string) => void
}

export interface InnerProps {
  recipe: Recipe
}

export interface OuterProps {
  recipe: Recipe
}

export type Props = OuterProps & Callbacks & InnerProps

export default (props: Recipe): JSX.Element => (
  <>
    <Name {...props} />
    <div className="content">
      <IngredientList {...props} />
      <StepsList {...props} />
    </div>
  </>
)
