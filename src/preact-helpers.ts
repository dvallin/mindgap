import { Option } from 'lazy-space'

export function eventTarget<T extends Element>(e: Event): Option<T> {
  return Option.of(e.target) as Option<T>
}

export function eventValue(e: Event): Option<string> {
  return eventTarget<HTMLInputElement>(e).map(e => e.value)
}
