import { List } from 'lazy-space'
import * as React from 'react'

import { Ingredient } from '.'

export default (props: { ingredients: Ingredient[] }): JSX.Element => (
  <>
    {List.of(props.ingredients)
      .map(({ name, value, unit }, index) => (
        <span key={index}>
          {name}
          {value}
          {unit}
        </span>
      ))
      .intersperse((_, i) => <span key={`komma-${i}`}>, </span>)
      .toArray()}
  </>
)
