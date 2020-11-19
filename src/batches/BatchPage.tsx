import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { Option } from 'lazy-space'

import { Batch } from '.'

import { Recipe } from '../recipes'
import BatchEditor from './BatchEditor'

export interface InnerProps {
  batch: Option<Batch>
  recipe: Option<Recipe>
}

export type Props = InnerProps & RouteComponentProps<{ id?: string }>

export class BatchPage extends React.Component<Props> {
  render(): JSX.Element {
    return Option.of(this.props.match.params.id).unwrap(
      (id) => (
        <section className="section">
          <article>
            <BatchEditor id={id} />
          </article>
        </section>
      ),
      () => <></>
    )
  }
}

export default BatchPage
