import { Fragment, h } from 'preact'

import { Name } from '.'

export interface Props {
  name: Name
}

export default (props: Props) => (
  <Fragment>
    <h1 className="title">{props.name.name}</h1>
    <h2 className="subtitle">{props.name.description}</h2>
  </Fragment>
)
