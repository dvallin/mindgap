import { h } from 'preact'

import { Recipe } from '..'
import { daysAgo, Id } from '../../common'
import Link from '../../link'

export interface Props {
  recipeId: Id
  recipe: Recipe
}

export default (props: Props) => {
  const { recipe, recipeId } = props
  return (
    <article className="media">
      <Link path={`/recipes/${recipeId}`} inherit>
        <div className="media-content">
          <div className="content">
            <p>
              <strong>{recipe.name || 'unnamed recipe'}</strong> <small>{daysAgo(recipe.date)} days ago</small>
              <br />
              {recipe.description}
            </p>
          </div>
        </div>
      </Link>
    </article>
  )
}
