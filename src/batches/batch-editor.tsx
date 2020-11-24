import { Option } from 'lazy-space'
import { Fragment, h } from 'preact'

import { updateName, addStep, updateRecipe, updateRecipeScale, updateStep } from '.'
import { useApplicationState } from '../state'

import { Id } from '../common'
import { eventValue } from '../preact-helpers'

import NameEditor from '../name/name-editor'
import RecipeComponent from '../recipes/recipe'
import RecipeSelect from '../recipes/recipe-select'
import NotFound from '../pages/not-found'
import StepsEditor from '../steps/steps-editor'

export interface Props {
  id: Id
}

export default (props: Props) => {
  const [state, mutate] = useApplicationState()
  return Option.of(state.batches[props.id]).unwrap(
    batch => (
      <div className="tile is-ancestor">
        <div className="tile is-8 is-vertical is-parent">
          <div className="tile is-child">
            <NameEditor name={batch} updateName={name => mutate(updateName(props.id, name))} />
            <div className="content">
              <StepsEditor
                steps={batch.actions}
                addStep={step => mutate(addStep(props.id, step))}
                updateStep={(index, step) => mutate(updateStep(props.id, index, step))}
              />
            </div>
          </div>
        </div>
        <div className="tile is-parent">
          <div className="tile is-child box">
            <RecipeSelect
              onSelect={recipe => mutate(updateRecipe(props.id, recipe))}
              placeholder="Select a base Recipe"
              value={Option.of(batch.recipe)
                .map(r => r.id)
                .getOrElse(undefined)}
            />
            <input
              className="input"
              step="1"
              min="0"
              max="100"
              value={Option.of(batch.recipe)
                .map(r => r.scale)
                .getOrElse(0)}
              onInput={e =>
                eventValue(e)
                  .map(Number.parseFloat)
                  .map(v => mutate(updateRecipeScale(props.id, v)))
              }
              type="range"
            />
            {Option.of(batch.recipe)
              .map(({ id }) => state.recipes[id])
              .unwrap(
                recipe => (
                  <RecipeComponent recipe={recipe} />
                ),
                () => (
                  <Fragment></Fragment>
                )
              )}
          </div>
        </div>
      </div>
    ),
    () => <NotFound />
  )
}
