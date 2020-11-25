import { h, createContext, RenderableProps } from 'preact'
import { useContext, useReducer } from 'preact/hooks'
import { Draft, produce } from 'immer'

import { Id } from './common'
import { Batch } from './batches'
import { Recipe } from './recipes'

export type Mutation<State> = (draft: Draft<State>) => void
export type Mutate<State> = (mutation: Mutation<State>) => void

export interface State {
  batches: { [id in Id]: Batch }
  recipes: { [id in Id]: Recipe }
}
export const initialState: State = {
  batches: {},
  recipes: {},
}

export const ApplicationState = createContext<[State, Mutate<State>]>([initialState, () => undefined])

export interface ProviderProps {
  onChange?: (state: State) => void
  initialState?: () => State
}
export function Provider<T>(props: RenderableProps<T> & ProviderProps) {
  const [state, mutate] = useReducer<State, Mutation<State>>(
    (state, mutation) => {
      const s = produce(state, draft => {
        mutation(draft)
      })
      props.onChange && props.onChange(s)
      return s
    },
    props.initialState ? props.initialState() : initialState
  )
  return <ApplicationState.Provider value={[state, mutate]}>{props.children}</ApplicationState.Provider>
}

export function useApplicationState(): [State, Mutate<State>] {
  return useContext(ApplicationState)
}
