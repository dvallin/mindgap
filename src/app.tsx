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

export default () => (
  <div id="app">
    <Provider initialState={loadState} onChange={writeState}>
      <Header />
      <Router>
        <BatchPage path="/batches/:id" />
        <BatchesPage path="/batches" />

        <RecipePage path="/recipes/:id" />
        <RecipesPage path="/recipes" />

        <LandingPage path="/" />
        <NotFound default />
      </Router>
    </Provider>
  </div>
)
