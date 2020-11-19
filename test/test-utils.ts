import produce from 'immer'
import { batch, Batch } from '../src/batches'
import { recipe, Recipe } from '../src/recipes'

export const testDate = '2020-07-24T11:44:41.293Z'

export const testBatch: Batch = produce(batch(), (d) => {
  d.name = 'Test Batch'
  d.description = 'a batch for testing purposes'
  d.date = testDate
})

export const testRecipe: Recipe = produce(recipe(), (d) => {
  d.name = 'Test Recipe'
  d.description = 'a recipe for testing purposes'
  d.date = testDate
})
