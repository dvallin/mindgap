import { Recipe } from '.'
import { BaseAction } from '../react-helpers'
import produce from 'immer'
import { Id, Name } from '../common'
import { Ingredient } from '../ingredients'
import { Option } from 'lazy-space'
import { Step } from '../steps'

export interface RecipeState {
  recipeCache: { [id in Id]: Recipe }
}

export type AddRecipe = BaseAction<'RECIPE', 'ADD_RECIPE'> & { id: string; recipe: Recipe }
export const addRecipe = (id: string, recipe: Recipe): AddRecipe => ({ module: 'RECIPE', type: 'ADD_RECIPE', id, recipe })

export type UpdateName = BaseAction<'RECIPE', 'UPDATE_NAME'> & { id: string; name: Name }
export const updateName = (id: string, name: Name): UpdateName => ({
  module: 'RECIPE',
  type: 'UPDATE_NAME',
  id,
  name,
})
export type AddIngredient = BaseAction<'RECIPE', 'ADD_INGREDIENT'> & { id: string; ingredient: Ingredient }
export const addIngredient = (id: string, ingredient: Ingredient): AddIngredient => ({
  module: 'RECIPE',
  type: 'ADD_INGREDIENT',
  id,
  ingredient,
})
export type DeleteIngredient = BaseAction<'RECIPE', 'DELETE_INGREDIENT'> & { id: string; index: number }
export const deleteIngredient = (id: string, index: number): DeleteIngredient => ({
  module: 'RECIPE',
  type: 'DELETE_INGREDIENT',
  id,
  index,
})
export type UpdateIngredient = BaseAction<'RECIPE', 'UPDATE_INGREDIENT'> & { id: string; index: number; ingredient: Ingredient }
export const updateIngredient = (id: string, index: number, ingredient: Ingredient): UpdateIngredient => ({
  module: 'RECIPE',
  type: 'UPDATE_INGREDIENT',
  id,
  index,
  ingredient,
})
export type AddStep = BaseAction<'RECIPE', 'ADD_STEP'> & { id: string; step: Step }
export const addStep = (id: string, step: Step): AddStep => ({ module: 'RECIPE', type: 'ADD_STEP', id, step })
export type UpdateStep = BaseAction<'RECIPE', 'UPDATE_STEP'> & { id: string; index: number; step: Step }
export const updateStep = (id: string, index: number, step: Step): UpdateStep => ({
  module: 'RECIPE',
  type: 'UPDATE_STEP',
  id,
  index,
  step,
})

export type RecipeAction = AddRecipe | UpdateName | AddIngredient | DeleteIngredient | UpdateIngredient | AddStep | UpdateStep

export const initialState = (): RecipeState => ({
  recipeCache: {},
})

export const recipes = (state: RecipeState = initialState(), action: RecipeAction): RecipeState => {
  if (action.module !== 'RECIPE') {
    return state
  }
  return produce(state, (draft) => {
    switch (action.type) {
      case 'UPDATE_NAME': {
        Option.of(draft.recipeCache[action.id]).map((recipe) => {
          recipe.description = action.name.description
          recipe.name = action.name.name
        })
        break
      }
      case 'ADD_RECIPE': {
        draft.recipeCache[action.id] = action.recipe
        break
      }
      case 'ADD_INGREDIENT': {
        Option.of(draft.recipeCache[action.id]).map((recipe) => recipe.ingredients.push(action.ingredient))
        break
      }
      case 'DELETE_INGREDIENT': {
        Option.of(draft.recipeCache[action.id]).map((recipe) => recipe.ingredients.splice(action.index, 1))
        break
      }
      case 'UPDATE_INGREDIENT': {
        Option.of(draft.recipeCache[action.id]).map((recipe) => (recipe.ingredients[action.index] = action.ingredient))
        break
      }
      case 'ADD_STEP': {
        Option.of(draft.recipeCache[action.id]).map((recipe) => recipe.steps.push(action.step))
        break
      }
      case 'UPDATE_STEP': {
        Option.of(draft.recipeCache[action.id]).map((recipe) => (recipe.steps[action.index] = action.step))
        break
      }
    }
  })
}
