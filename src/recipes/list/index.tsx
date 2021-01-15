import { Fragment, h } from 'preact'
import { useState } from 'preact/hooks'

import { Id, matches } from '../../common'
import CreateRecipe from '../create'
import RecipeListItem from './list-item'
import { eventValue } from '../../preact-helpers'
import { Recipe } from '..'
import { useI18N } from '../../i18n'

export interface Props {
  recipes: { [id in Id]: Recipe }
}

export default (props: Props) => {
  const [filter, setFilter] = useState('')
  const translations = useI18N()
  const recipes = Object.entries(props.recipes)
    .filter(([_, recipe]) => matches(recipe, ['name', 'description'], filter))
    .sort((l, r) => l[1].date.localeCompare(r[1].date))
    .map(([id, batch]) => <RecipeListItem key={id} recipeId={id} recipe={batch} />)
  return (
    <Fragment>
      <div className="field is-grouped">
        <p className="control is-expanded">
          <input className="input" value={filter} onInput={e => eventValue(e).map(setFilter)} placeholder={translations.search} />
        </p>
        <p className="control">
          <CreateRecipe />
        </p>
      </div>
      <div className="box">{recipes}</div>
    </Fragment>
  )
}
