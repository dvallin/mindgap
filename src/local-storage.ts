import produce from 'immer'
import { Async, Option } from 'lazy-space'
import { initialState, State } from './state'

export function loadState(): State {
  return produce(initialState, s => {
    Option.of(localStorage.getItem('batches'))
      .map(JSON.parse)
      .map(v => (s.batches = v))
    Option.of(localStorage.getItem('recipes'))
      .map(JSON.parse)
      .map(v => (s.recipes = v))
  })
}

const throttle = Async.throttle(100)
export function writeState(state: State): Async<boolean> {
  return throttle
    .eval()
    .map(() => {
      localStorage.setItem('batches', JSON.stringify(state.batches))
      localStorage.setItem('recipes', JSON.stringify(state.recipes))
      return true
    })
    .recover(() => false)
}
