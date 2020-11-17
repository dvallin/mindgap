import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { Option } from 'lazy-space'
import RecipeEditor from './RecipeEditor'

export type Props = RouteComponentProps<{ id?: string }>

export class RecipePage extends React.Component<Props> {
  render(): JSX.Element {
    return Option.of(this.props.match.params.id).unwrap(
      (id) => (
        <section className="section">
          <article>
            <div className="box">
              <RecipeEditor id={id} />
            </div>
          </article>
        </section>
      ),
      () => <></>
    )
  }
}

export default RecipePage
