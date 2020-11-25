import { h } from 'preact'
import { Router } from 'preact-router'

import Header from './pages/header'
import NotFound from './pages/not-found'
import LandingPage from './pages/landing-page'

import BatchesPage from './pages/batches-page'
import RecipesPage from './pages/recipes-page'
import BatchPage from './pages/batch-page'
import RecipePage from './pages/recipe-page'

import { Provider } from './state'
import { loadState, writeState } from './local-storage'
import { makePath } from './path'

export default () => (
  <div id="app">
    <Provider initialState={loadState} onChange={writeState}>
      <Header />
      <Router>
        <BatchPage path={makePath('/batches/:id')} />
        <BatchesPage path={makePath('/batches')} />

        <RecipePage path={makePath('/recipes/:id')} />
        <RecipesPage path={makePath('/recipes')} />

        <LandingPage path={makePath('/')} />
        <NotFound default />
      </Router>
    </Provider>
  </div>
)
