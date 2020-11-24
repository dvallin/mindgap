import { Draft } from 'immer'
import { Option } from 'lazy-space'
import { event, Event } from '../common'
import { Ingredient, scale as scaleIngredient } from '../ingredients'
import { Name, name } from '../name'
import { Mutation, State } from '../state'
import { Step } from '../steps'

export interface Recipe extends Name, Event {
  ingredients: Ingredient[]
  steps: Step[]
}

export const recipe = (): Recipe => ({ ...name(), ...event(), ingredients: [], steps: [] })

export function scale(recipe: Draft<Recipe>, scale: number): void {
  recipe.ingredients.forEach(i => {
    scaleIngredient(i, scale)
  })
  recipe.steps.forEach(s => {
    if (s.kind === 'addition') {
      s.ingredients.forEach(i => {
        scaleIngredient(i, scale)
      })
    }
  })
}

export function addRecipe(id: string, batch: Recipe): Mutation<State> {
  return draft => (draft.recipes[id] = batch)
}

export function updateName(id: string, name: Name): Mutation<State> {
  return draft =>
    Option.of(draft.recipes[id]).map(r => {
      r.name = name.name
      r.description = name.description
    })
}

export function addIngredient(id: string, ingredient: Ingredient): Mutation<State> {
  return draft => Option.of(draft.recipes[id]).map(r => r.ingredients.push(ingredient))
}

export function updateIngredient(id: string, index: number, ingredient: Ingredient): Mutation<State> {
  return draft => Option.of(draft.recipes[id]).map(r => (r.ingredients[index] = ingredient))
}

export function deleteIngredient(id: string, index: number): Mutation<State> {
  return draft => Option.of(draft.recipes[id]).map(r => r.ingredients.splice(index, 1))
}

export function addStep(id: string, step: Step): Mutation<State> {
  return draft => Option.of(draft.recipes[id]).map(r => r.steps.push(step))
}

export function updateStep(id: string, index: number, step: Step): Mutation<State> {
  return draft => Option.of(draft.recipes[id]).map(r => (r.steps[index] = step))
}
