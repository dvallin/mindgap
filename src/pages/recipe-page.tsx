import { Fragment, h } from 'preact'
import { Option } from 'lazy-space'
import RecipeEditor from '../recipes/recipe-editor'
import { PageProps } from '.'

export interface Props {
  id?: string
}

export default (props: Props & PageProps) =>
  Option.of(props.id).unwrap(
    id => (
      <section className="section">
        <article>
          <RecipeEditor id={id} />
        </article>
      </section>
    ),
    () => <Fragment></Fragment>
  )
