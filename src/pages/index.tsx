import { h } from 'preact'

import AllBatches from './recipes-page'
import AllRecipes from './recipes-page'

export default () => (
  <section className="section">
    <h1 className="title">Mindgap</h1>
    <h2 className="subtitle">All Batches</h2>
    <AllBatches />
    <h2 className="subtitle">All Recipes</h2>
    <AllRecipes />
  </section>
)
