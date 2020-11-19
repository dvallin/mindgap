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
import { addIngredient, addStep, deleteIngredient, updateIngredient, updateName, updateStep } from './state'

export interface Callbacks {
  updateName: (name: Name) => void
  addIngredient: (name: string) => void
  updateIngredient: (index: number, ingredient: Ingredient) => void
  deleteIngredient: (index: number) => void
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

export const RecipeEditor = (props: Props): JSX.Element =>
  props.recipe.unwrap(
    (recipe) => (
      <>
        <NameEditor {...recipe} updateName={props.updateName} />
        <div className="content">
          <IngredientsEditor
            {...recipe}
            addIngredient={props.addIngredient}
            updateIngredient={props.updateIngredient}
            deleteIngredient={props.deleteIngredient}
          />
          <StepsEditor {...recipe} addStep={props.addStep} updateStep={props.updateStep} />
        </div>
      </>
    ),
    () => <></>
  )

export const dispatchToProps = (dispatch: Dispatch, props: OuterProps): Callbacks => ({
  updateName: (name) => dispatch(updateName(props.id, name)),
  addIngredient: (name) => dispatch(addIngredient(props.id, { name })),
  updateIngredient: (index, ingredient) => dispatch(updateIngredient(props.id, index, ingredient)),
  deleteIngredient: (index) => dispatch(deleteIngredient(props.id, index)),
  addStep: (step) => dispatch(addStep(props.id, step)),
  updateStep: (index, step) => dispatch(updateStep(props.id, index, step)),
})

export const stateToProps = (state: State, props: OuterProps): InnerProps => ({
  recipe: Option.of(state.recipes.recipeCache[props.id]),
})

export default connect(stateToProps, dispatchToProps)(RecipeEditor)
