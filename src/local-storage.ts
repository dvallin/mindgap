import produce from 'immer'
import { Async, Option } from 'lazy-space'
import { initialState, State } from './state'

export function setObject(key: string, value: object): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(key, JSON.stringify(value))
  }
}
export function getObject<T>(key: string): Option<T> {
  if (typeof window !== 'undefined') {
    return Option.of(localStorage.getItem(key)).map(JSON.parse)
  }
  return Option.none()
}

export function loadState(): State {
  return produce(initialState, s => {
    getObject<State['batches']>('batches').map(v => (s.batches = v))
    getObject<State['recipes']>('recipes').map(v => (s.recipes = v))
  })
}

const throttle = Async.throttle(100)
export function writeState(state: State): Async<boolean> {
  return throttle
    .eval()
    .map(() => {
      setObject('batches', state.batches)
      setObject('recipes', state.recipes)
      return true
    })
    .recover(() => false)
}
