import * as React from 'react'

import { Name } from '.'

export default (props: Name): JSX.Element => (
  <>
    <h1 className="title">{props.name}</h1>
    <h2 className="subtitle">{props.description}</h2>
  </>
)
