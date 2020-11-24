import { h } from 'preact'
import { Link } from 'preact-router'

import { Recipe } from '..'
import { daysAgo, Id } from '../../common'

export interface Props {
  recipeId: Id
  recipe: Recipe
}

export default (props: Props) => {
  const { recipe, recipeId } = props
  return (
    <article className="media">
      <Link href={`/recipes/${recipeId}`} style={{ color: 'inherit', textDecoration: 'inherit' }}>
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
