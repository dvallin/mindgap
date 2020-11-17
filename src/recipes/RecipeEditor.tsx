import { Option } from 'lazy-space'
import * as React from 'react'
import { connect } from 'react-redux'

import { Recipe } from '.'
import { Id, Name } from '../common'

import NameEditor from '../common/NameEditor'
import { Ingredient } from '../ingredients'
import IngredientsEditor from '../ingredients/IngredientsEditor'
import { Step } from '../steps'
import StepsEditor from '../steps/StepsEditor'
import { Dispatch, State } from '../store'
import { addIngredient, addStep, updateIngredient, updateName, updateStep } from './state'

export interface Callbacks {
  addIngredient: (name: string) => void
  updateIngredient: (index: number, ingredient: Ingredient) => void
  updateName: (name: Name) => void
  addStep: (step: Step) => void
  updateStep: (index: number, step: Step) => void
}

export interface InnerProps {
  recipe: Option<Recipe>
}

export interface OuterProps {
  id: Id
}

export type Props = OuterProps & Callbacks & InnerProps

export const RecipeComponent = (props: Props): JSX.Element =>
  props.recipe.unwrap(
    (recipe) => (
      <>
        <NameEditor {...recipe} updateName={props.updateName} />
        <div className="content">
          <IngredientsEditor {...recipe} addIngredient={props.addIngredient} updateIngredient={props.updateIngredient} />
          <StepsEditor {...recipe} addStep={props.addStep} updateStep={props.updateStep} />
        </div>
      </>
    ),
    () => <></>
  )

export const dispatchToProps = (dispatch: Dispatch, props: OuterProps): Callbacks => ({
  addIngredient: (name) => dispatch(addIngredient(props.id, { name })),
  updateIngredient: (index, ingredient) => dispatch(updateIngredient(props.id, index, ingredient)),
  updateName: (name) => dispatch(updateName(props.id, name)),
  addStep: (step) => dispatch(addStep(props.id, step)),
  updateStep: (index, step) => dispatch(updateStep(props.id, index, step)),
})

export const stateToProps = (state: State, props: OuterProps): InnerProps => ({
  recipe: Option.of(state.recipes.recipeCache[props.id]),
})

export default connect(stateToProps, dispatchToProps)(RecipeComponent)
