import produce from 'immer'
import { Async, Option } from 'lazy-space'
import { initialState, State } from './store'

export function loadState(): State {
  return produce(initialState, (s) => {
    Option.of(localStorage.getItem('batchCache'))
      .map(JSON.parse)
      .map((v) => (s.batches.batchCache = v))
    Option.of(localStorage.getItem('recipeCache'))
      .map(JSON.parse)
      .map((v) => (s.recipes.recipeCache = v))
  })
}

const throttle = Async.throttle(100)
export function writeState(state: State): Async<boolean> {
  return throttle
    .eval()
    .map(() => {
      localStorage.setItem('batchCache', JSON.stringify(state.batches.batchCache))
      localStorage.setItem('recipeCache', JSON.stringify(state.recipes.recipeCache))
      return true
    })
    .recover(() => false)
}
