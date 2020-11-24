import { h } from 'preact'
import { route } from 'preact-router'
import { v4 } from 'uuid'

import { recipe, addRecipe } from '.'
import { useApplicationState } from '../state'

export default () => {
  const [, mutate] = useApplicationState()
  return (
    <button
      className="button is-info"
      onClick={() => {
        const id = v4()
        mutate(addRecipe(id, recipe()))
        route(`/recipes/${id}`)
      }}
    >
      <span>new batch</span>
      <span className="icon is-small">
        <i className="fas fa-plus" aria-hidden="true"></i>
      </span>
    </button>
  )
}
