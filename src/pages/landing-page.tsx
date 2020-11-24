import { h } from 'preact'
import { PageProps } from '.'

import AllBatches from '../batches/list/all'
import AllRecipes from '../recipes/list/all'

export default (_props: PageProps) => (
  <section className="section">
    <h1 className="title">Overview</h1>
    <h2 className="subtitle">All Batches</h2>
    <AllBatches />
    <h2 className="subtitle">All Recipes</h2>
    <AllRecipes />
  </section>
)
