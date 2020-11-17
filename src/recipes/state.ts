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

export type UpdateName = BaseAction<'UPDATE_NAME'> & { id: string; name: Name }
export const updateName = (id: string, name: Name): UpdateName => ({
  type: 'UPDATE_NAME',
  id,
  name,
})
export type AddIngredient = BaseAction<'ADD_INGREDIENT'> & { id: string; ingredient: Ingredient }
export const addIngredient = (id: string, ingredient: Ingredient): AddIngredient => ({ type: 'ADD_INGREDIENT', id, ingredient })
export type UpdateIngredient = BaseAction<'UPDATE_INGREDIENT'> & { id: string; index: number; ingredient: Ingredient }
export const updateIngredient = (id: string, index: number, ingredient: Ingredient): UpdateIngredient => ({
  type: 'UPDATE_INGREDIENT',
  id,
  index,
  ingredient,
})
export type AddStep = BaseAction<'ADD_STEP'> & { id: string; step: Step }
export const addStep = (id: string, step: Step): AddStep => ({ type: 'ADD_STEP', id, step })
export type UpdateStep = BaseAction<'UPDATE_STEP'> & { id: string; index: number; step: Step }
export const updateStep = (id: string, index: number, step: Step): UpdateStep => ({
  type: 'UPDATE_STEP',
  id,
  index,
  step,
})

export type RecipeAction = UpdateName | AddIngredient | UpdateIngredient | AddStep | UpdateStep

export const initialState = (): RecipeState => ({
  recipeCache: {
    recipe1: {
      name: 'Kombucha',
      description: 'default kombucha',
      ingredients: [
        { name: 'black tea', value: 10, unit: 'gram' },
        { name: 'water', value: 1, unit: 'liter' },
        { name: 'sugar', value: 100, unit: 'gram' },
        { name: 'kumbucha', value: 100, unit: 'milliliter' },
        { name: 'SCOBY' },
      ],
      steps: [
        { kind: 'addition', ingredients: [{ name: 'black tea' }, { name: 'water' }, { name: 'sugar' }] },
        { kind: 'manipulation', note: 'let tea steep for 10 minutes' },
        { kind: 'measurement', note: 'check temperatur is below', value: '40', unit: 'celsius' },
        { kind: 'addition', ingredients: [{ name: 'black tea' }, { name: 'water' }, { name: 'sugar' }] },
        { kind: 'wait', min: 'P7D', max: 'P8D' },
      ],
    },
  },
})

export const recipes = (state: RecipeState = initialState(), action: RecipeAction): RecipeState => {
  return produce(state, (draft) => {
    switch (action.type) {
      case 'UPDATE_NAME': {
        Option.of(draft.recipeCache[action.id]).map((recipe) => {
          recipe.description = action.name.description
          recipe.name = action.name.name
        })
        break
      }
      case 'ADD_INGREDIENT': {
        Option.of(draft.recipeCache[action.id]).map((recipe) => recipe.ingredients.push(action.ingredient))
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
