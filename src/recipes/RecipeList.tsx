import * as React from 'react'
import { Link } from 'react-router-dom'

import { daysAgo, Id } from '../common'
import { Recipe } from '.'

export interface Props {
  recipes: { [id in Id]: Recipe }
}

export class RecipeList extends React.Component<Props> {
  renderRecipe(id: Id): JSX.Element {
    const recipe = this.props.recipes[id]
    return (
      <article className="media" key={id}>
        <Link to={`/recipes/${id}`} style={{ color: 'inherit', textDecoration: 'inherit' }}>
          <div className="media-content">
            <div className="content">
              <p>
                <strong>{recipe.name || "unnamed recipe"}</strong> <small>{daysAgo(recipe.date)} days ago</small>
                <br />
                {recipe.description}
              </p>
            </div>
          </div>
        </Link>
      </article>
    )
  }

  render(): JSX.Element {
    const recipes = Object.entries(this.props.recipes)
      .sort((l, r) => l[1].date.localeCompare(r[1].date))
      .map(([id]) => this.renderRecipe(id))
    return <div className="box">{recipes}</div>
  }
}

export default RecipeList
