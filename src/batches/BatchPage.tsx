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
  batch: Option<Batch>
  recipe: Option<Recipe>
}

export type Props = InnerProps & RouteComponentProps<{ id?: string }>

export class BatchPage extends React.Component<Props> {
  render(): JSX.Element {
    return this.props.batch.unwrap(
      (batch) => (
        <section className="section">
          <article>
            <div className="tile is-ancestor">
              <div className="tile is-8 is-vertical is-parent">
                <div className="tile is-child">
                  <Name {...batch} />
                </div>
              </div>
              <div className="tile is-parent">
                <div className="tile is-child box">
                  {this.props.recipe.unwrap(
                    (recipe) => (
                      <RecipeComponent {...recipe} />
                    ),
                    () => (
                      <></>
                    )
                  )}
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

export const stateToProps = (state: State, props: RouteComponentProps<{ id?: string }>): InnerProps => {
  const batch = Option.of(props.match.params.id).map((id) => state.batches.batchCache[id])
  return {
    batch,
    recipe: batch.flatMap((batch) =>
      Option.of(batch.recipe).flatMap(({ id, scale: s }) =>
        Option.of(state.recipes.recipeCache[id]).map((recipe) => produce(recipe, (d) => scale(d, s)))
      )
    ),
  }
}

export default connect(stateToProps)(BatchPage)
