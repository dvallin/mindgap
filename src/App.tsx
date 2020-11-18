import * as React from 'react'
import { NavLink, Route, RouteChildrenProps, withRouter } from 'react-router-dom'

import icon from './images/icon.svg'

import { connect } from 'react-redux'
import { State } from './store'

import RecipePage from './recipes/RecipePage'
import BatchPage from './batches/BatchPage'
import LandingPage from './landing-page/LandingPage'
import BatchesPage from './batches/BatchesPage'
import AllRecipesPage from './recipes/RecipesPage'

export interface InnerProps {
  batches: number
  batchesDone: number
  recipes: number
}

export type Props = InnerProps & RouteChildrenProps

export const App = (props: Props): JSX.Element => (
  <div className="container">
    <section className="section">
      <nav className="level">
        <div className="level-item has-text-centered">
          <NavLink to="/batches?done=false" activeClassName="is-active" exact>
            <p className="heading">Active</p>
            <p className="title">{props.batches - props.batchesDone}</p>
          </NavLink>
        </div>
        <div className="level-item has-text-centered">
          <NavLink to="/batches?done=true" activeClassName="is-active" exact>
            <p className="heading">Done</p>
            <p className="title">{props.batchesDone}</p>
          </NavLink>
        </div>
        <p className="level-item has-text-centered">
          <NavLink to="/" activeClassName="is-active" exact>
            <img src={icon} alt="Mindgap" style={{ height: '60px' }} />
          </NavLink>
        </p>
        <div className="level-item has-text-centered">
          <NavLink to="/batches" activeClassName="is-active" exact>
            <p className="heading">Batches</p>
            <p className="title">{props.batches}</p>
          </NavLink>
        </div>
        <div className="level-item has-text-centered">
          <NavLink to="/recipes" activeClassName="is-active" exact>
            <p className="heading">Recipes</p>
            <p className="title">{props.recipes}</p>
          </NavLink>
        </div>
      </nav>
    </section>
    <Route exact path="/" component={LandingPage} />
    <Route exact path="/batches" component={BatchesPage} />
    <Route exact path="/recipes/" component={AllRecipesPage} />
    <Route exact path="/recipes/:id?" component={RecipePage} />
    <Route exact path="/batches/:id?" component={BatchPage} />
  </div>
)

export const stateToProps = (state: State): InnerProps => ({
  batches: Object.values(state.batches.batchCache).length,
  batchesDone: Object.values(state.batches.batchCache).filter((b) => b.done).length,
  recipes: Object.values(state.recipes.recipeCache).length,
})

export default withRouter(connect(stateToProps)(App))
