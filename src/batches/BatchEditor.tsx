import { Option } from 'lazy-space'
import * as React from 'react'
import { connect } from 'react-redux'

import { Batch } from '.'
import { Id, Name } from '../common'

import NameEditor from '../common/NameEditor'
import { Recipe } from '../recipes'
import { Dispatch, State } from '../store'
import { scale as scaleRecipe } from '../recipes'
import { addAction, updateAction, updateName, updateRecipe, updateRecipeScale } from './state'
import produce from 'immer'
import RecipeComponent from '../recipes/Recipe'
import RecipeSelect from '../recipes/RecipeSelect'
import StepsEditor from '../steps/StepsEditor'
import { Step } from '../steps'

export interface Callbacks {
  updateName: (name: Name) => void
  updateRecipe: (id: string) => void
  updateRecipeScale: (scale: number) => void
  addStep: (step: Step) => void
  updateStep: (index: number, step: Step) => void
}

export interface InnerProps {
  batch: Option<Batch>
  recipe: Option<Recipe>
}

export interface OuterProps {
  id: Id
}

export type Props = OuterProps & Callbacks & InnerProps

export const BatchEditor = (props: Props): JSX.Element =>
  props.batch.unwrap(
    (batch) => (
      <div className="tile is-ancestor">
        <div className="tile is-8 is-vertical is-parent">
          <div className="tile is-child">
            <NameEditor {...batch} updateName={props.updateName} />
            <div className="content">
              <StepsEditor steps={batch.actions} addStep={props.addStep} updateStep={props.updateStep} />
            </div>
          </div>
        </div>
        <div className="tile is-parent">
          <div className="tile is-child box">
            <RecipeSelect
              onSelect={props.updateRecipe}
              placeholder="Select a base Recipe"
              value={Option.of(batch.recipe)
                .map((r) => r.id)
                .getOrElse(undefined)}
            />
            <input
              className="input"
              step="1"
              min="0"
              max="100"
              value={Option.of(batch.recipe)
                .map((r) => r.scale)
                .getOrElse(0)}
              onChange={(e) => props.updateRecipeScale(e.target.valueAsNumber)}
              type="range"
            ></input>
            {props.recipe.unwrap(
              (recipe) => (
                <RecipeComponent {...recipe} />
              ),
              () => (
                <></>
              )
            )}
          </div>
        </div>
      </div>
    ),
    () => <></>
  )

export const dispatchToProps = (dispatch: Dispatch, props: OuterProps): Callbacks => ({
  updateName: (name) => dispatch(updateName(props.id, name)),
  updateRecipe: (id) => dispatch(updateRecipe(props.id, id)),
  updateRecipeScale: (scale) => dispatch(updateRecipeScale(props.id, scale)),
  addStep: (step) => dispatch(addAction(props.id, step)),
  updateStep: (index, step) => dispatch(updateAction(props.id, index, step)),
})

export const stateToProps = (state: State, props: OuterProps): InnerProps => {
  const batch = Option.of(state.batches.batchCache[props.id])
  const recipe = batch
    .map((batch) => batch.recipe)
    .flatMap(({ id, scale }) => Option.of(state.recipes.recipeCache[id]).map((r) => produce(r, (d) => scaleRecipe(d, scale))))
  return { batch, recipe }
}

export default connect(stateToProps, dispatchToProps)(BatchEditor)
