import { h, Fragment } from 'preact'

import { addIngredient, addStep, deleteIngredient, deleteStep, updateIngredient, updateName, updateStep } from '.'
import { useApplicationState } from '../state'

import { Id } from '../common'
import NameEditor from '../name/name-editor'
import IngredientsEditor from '../ingredients/ingredients-editor'
import StepsEditor from '../steps/steps-editor'
import { Option } from 'lazy-space'
import NotFound from '../pages/not-found'

export interface Props {
  id: Id
}

export default (props: Props) => {
  const [state, mutate] = useApplicationState()
  return Option.of(state.recipes[props.id]).unwrap(
    recipe => (
      <Fragment>
        <NameEditor name={recipe} updateName={name => mutate(updateName(props.id, name))} />
        <div className="content">
          <IngredientsEditor
            ingredients={recipe.ingredients}
            addIngredient={name => mutate(addIngredient(props.id, { name }))}
            updateIngredient={(index, ingredient) => mutate(updateIngredient(props.id, index, ingredient))}
            deleteIngredient={index => mutate(deleteIngredient(props.id, index))}
          />
          <StepsEditor
            steps={recipe.steps}
            addStep={step => mutate(addStep(props.id, step))}
            updateStep={(index, step) => mutate(updateStep(props.id, index, step))}
            deleteStep={index => mutate(deleteStep(props.id, index))}
          />
        </div>
      </Fragment>
    ),
    () => <NotFound />
  )
}
