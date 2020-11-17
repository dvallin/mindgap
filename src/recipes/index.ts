import { Draft } from 'immer'
import { Name } from '../common'
import { Ingredient, scale as scaleIngredient } from '../ingredients'
import { Step } from '../steps'

export interface Recipe extends Name {
  ingredients: Ingredient[]
  steps: Step[]
}

export function scale(recipe: Draft<Recipe>, scale: number): void {
  recipe.ingredients.forEach((i) => {
    scaleIngredient(i, scale)
  })
  recipe.steps.forEach((s) => {
    if (s.kind === 'addition') {
      s.ingredients.forEach((i) => {
        scaleIngredient(i, scale)
      })
    }
  })
}
