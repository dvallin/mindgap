import produce from 'immer'
import { Option } from 'lazy-space'
import { event, Event } from '../common'
import { Ingredient, scaleIngredient } from '../ingredients'
import { Name, name } from '../name'
import { Mutation, State } from '../state'
import { Step } from '../steps'

export interface Recipe extends Name, Event {
  ingredients: Ingredient[]
  steps: Step[]
}

export const recipe = (): Recipe => ({ ...name(), ...event(), ingredients: [], steps: [] })

export function scaleRecipe(recipe: Recipe, scale: number): Recipe {
  return produce(recipe, r => {
    r.ingredients.forEach(i => {
      scaleIngredient(i, scale)
    })
    r.steps.forEach(s => {
      if (s.kind === 'addition') {
        s.ingredients.forEach(i => {
          scaleIngredient(i, scale)
        })
      }
    })
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

export function deleteStep(id: string, index: number): Mutation<State> {
  return draft => Option.of(draft.recipes[id]).map(r => r.steps.splice(index, 1))
}
