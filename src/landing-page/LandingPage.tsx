import * as React from 'react'

import AllBatches from '../batches/AllBatches'
import AllRecipes from '../recipes/AllRecipes'

export default (): JSX.Element => (
  <section className="section">
    <h1 className="title">Mindgap</h1>
    <h2 className="subtitle">All Batches</h2>
    <AllBatches />
    <h2 className="subtitle">All Recipes</h2>
    <AllRecipes />
  </section>
)
