import { createShallowMount, mockRouteComponentProps } from './react-test-utils'
import { testBatch, testDate, testRecipe } from './test-utils'

import { App, stateToProps } from '../src/App'
import produce from 'immer'
import { initialState } from '../src/store'

describe('App', () => {
  const mount = createShallowMount(App, { batches: 3, batchesDone: 2, recipes: 1, ...mockRouteComponentProps({}) })

  describe('Component', () => {
    it('mounts', () => {
      expect(mount()).toMatchSnapshot()
    })
  })

  describe('Store Connection', () => {
    const state = produce(initialState, (s) => {
      s.batches.batchCache = {
        batch: testBatch,
        batch2: testBatch,
        done: produce(testBatch, (b) => {
          b.done = testDate
        }),
      }
      s.recipes.recipeCache = { recipe: testRecipe, recipe2: testRecipe }
    })

    const props = stateToProps(state)

    it('extracts counts', () => {
      expect(props).toEqual(
        expect.objectContaining({
          batches: 3,
          batchesDone: 1,
          recipes: 2,
        })
      )
    })
  })
})
