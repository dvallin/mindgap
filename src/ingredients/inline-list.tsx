import { h, Fragment } from 'preact'
import { List } from 'lazy-space'

import { Ingredient } from '.'

export interface Props {
  ingredients: Ingredient[]
}

export default (props: Props) => (
  <Fragment>
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
  </Fragment>
)
