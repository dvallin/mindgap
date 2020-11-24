import { Draft } from 'immer'
import { Option } from 'lazy-space'
import { Unit } from '../common'

export interface Ingredient {
  name: string
  value?: number
  unit?: Unit
}

export function scale(ingredient: Draft<Ingredient>, scale: number): void {
  Option.of(ingredient.value).map(v => (ingredient.value = v * scale))
}
