import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { connect } from 'react-redux'
import { Option } from 'lazy-space'

import { Batch } from '.'
import { State } from '../store'

import Name from '../common/Name'

import RecipeComponent from '../recipes/Recipe'
import { Recipe, scale } from '../recipes'
import produce from 'immer'

export interface InnerProps {
  resolved: Option<{
    batch: Batch
    recipe: Recipe
  }>
}

export type Props = InnerProps & RouteComponentProps<{ id?: string }>

export class BatchPage extends React.Component<Props> {
  render(): JSX.Element {
    return this.props.resolved.unwrap(
      ({ batch, recipe }) => (
        <section className="section">
          <article>
            <div className="tile is-ancestor">
              <div className="tile is-8 is-vertical is-parent">
                <div className="tile is-child box">
                  <Name {...batch} />
                </div>
              </div>
              <div className="tile is-parent">
                <div className="tile is-child box">
                  <RecipeComponent {...recipe} />
                </div>
              </div>
            </div>
          </article>
        </section>
      ),
      () => <></>
    )
  }
}

export const stateToProps = (state: State, props: RouteComponentProps<{ id?: string }>): InnerProps => ({
  resolved: Option.of(props.match.params.id)
    .map((id) => state.batches.batchCache[id])
    .flatMap((batch) =>
      Option.of(batch.recipe)
        .flatMap(({ id, scale: s }) => Option.of(state.recipes.recipeCache[id]).map((recipe) => produce(recipe, (d) => scale(d, s))))
        .map((recipe) => ({ batch, recipe }))
    ),
})

export default connect(stateToProps)(BatchPage)
