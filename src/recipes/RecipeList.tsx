import * as React from 'react'
import { Link } from 'react-router-dom'

import { daysAgo, Id, matches } from '../common'
import { Recipe } from '.'
import CreateRecipe from './CreateRecipe'

export interface Props {
  recipes: { [id in Id]: Recipe }
}

export interface ComponentState {
  filter: string
}

export class RecipeList extends React.Component<Props, ComponentState> {
  readonly state: ComponentState = { filter: '' }

  renderRecipe(id: Id): JSX.Element {
    const recipe = this.props.recipes[id]
    return (
      <article className="media" key={id}>
        <Link to={`/recipes/${id}`} style={{ color: 'inherit', textDecoration: 'inherit' }}>
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

  render(): JSX.Element {
    const recipes = Object.entries(this.props.recipes)
      .filter(([_, batch]) => matches(batch, ['name', 'description'], this.state.filter))
      .sort((l, r) => l[1].date.localeCompare(r[1].date))
      .map(([id]) => this.renderRecipe(id))
    return (
      <>
        <div className="field is-grouped">
          <p className="control is-expanded">
            <input
              className="input"
              value={this.state.filter}
              onChange={(e) => this.setState({ filter: e.target.value })}
              placeholder="search"
            />
          </p>
          <p className="control">
            <CreateRecipe />
          </p>
        </div>
        <div className="box">{recipes}</div>
      </>
    )
  }
}

export default RecipeList
