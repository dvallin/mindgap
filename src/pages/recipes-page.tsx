import { h } from 'preact'
import { PageProps } from '.'
import AllRecipes from '../recipes/list/all'

export default (_props: PageProps) => (
  <section className="section">
    <h1 className="title">All Recipes</h1>
    <AllRecipes />
  </section>
)
