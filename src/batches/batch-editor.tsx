import { Option } from 'lazy-space'
import { Fragment, h } from 'preact'

import { updateName, addStep, updateRecipe, updateRecipeScale, updateStep, closeBatch, openBatch, Batch, deleteStep } from '.'
import { useApplicationState } from '../state'

import { Id } from '../common'
import { eventValue } from '../preact-helpers'

import NameEditor from '../name/name-editor'
import RecipeComponent from './batch-recipe'
import RecipeSelect from '../recipes/recipe-select'
import NotFound from '../pages/not-found'
import StepsEditor from '../steps/steps-editor'
import { scaleRecipe } from '../recipes'

export interface Props {
  id: Id
}

export const BatchEdit = (props: { id: string; batch: Batch }) => {
  const [, mutate] = useApplicationState()
  return (
    <Fragment>
      <NameEditor name={props.batch} updateName={name => mutate(updateName(props.id, name))} />
      <div className="content">
        <StepsEditor
          disabled={props.batch.done !== undefined}
          steps={props.batch.actions}
          addStep={step => mutate(addStep(props.id, step))}
          updateStep={(index, step) => mutate(updateStep(props.id, index, step))}
          deleteStep={index => mutate(deleteStep(props.id, index))}
        />
        <button className="button is-info" onClick={() => mutate(props.batch.done ? openBatch(props.id) : closeBatch(props.id))}>
          <span>{props.batch.done ? 'reopen' : 'close'}</span>
        </button>
      </div>
    </Fragment>
  )
}

export const BatchRecipeEdit = (props: { id: string; batch: Batch }) => {
  const [state, mutate] = useApplicationState()
  return (
    <Fragment>
      <h4 className="title is-4">Base Recipe</h4>
      <div className="block">
        <RecipeSelect
          onSelect={recipe => mutate(updateRecipe(props.id, recipe))}
          placeholder="Select a base Recipe"
          value={Option.of(props.batch.recipe)
            .map(r => r.id)
            .getOrElse(undefined)}
        />
      </div>
      <div className="block"></div>
      {Option.of(props.batch.recipe)
        .flatMap(({ id, scale }) => Option.of(state.recipes[id]).map(r => scaleRecipe(r, scale)))
        .unwrap(
          recipe => (
            <Fragment>
              <input
                data-testid="recipe-scale-input"
                className="input"
                step="1"
                min="1"
                max="30"
                value={Option.of(props.batch.recipe)
                  .map(r => r.scale)
                  .getOrElse(1)}
                onInput={e =>
                  eventValue(e)
                    .map(Number.parseFloat)
                    .map(v => mutate(updateRecipeScale(props.id, v)))
                }
                type="range"
              />
              <RecipeComponent
                recipe={recipe}
                disabled={props.batch.done !== undefined}
                onStepSelect={step => {
                  if (!props.batch.done) {
                    mutate(addStep(props.id, step))
                  }
                }}
              />
            </Fragment>
          ),
          () => (
            <Fragment></Fragment>
          )
        )}
    </Fragment>
  )
}

export default (props: Props) => {
  const [state] = useApplicationState()
  return Option.of(state.batches[props.id]).unwrap(
    batch => (
      <div className="tile is-ancestor">
        <div className="tile is-8 is-vertical is-parent">
          <div className="tile is-child">
            <BatchEdit batch={batch} id={props.id} />
          </div>
        </div>
        <div className="tile is-parent">
          <div className="tile is-child">
            <BatchRecipeEdit batch={batch} id={props.id} />
          </div>
        </div>
      </div>
    ),
    () => <NotFound />
  )
}
