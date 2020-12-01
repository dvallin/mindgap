import { h, FunctionComponent } from 'preact'
import { shallow, ShallowWrapper } from 'enzyme'

import { State, initialState } from '../src/state'
import * as ApplicationState from '../src/state'
import produce from 'immer'
import { Batch, batch } from '../src/batches'

export const testDate = '2020-10-18:10:00:00Z'
export const testBatch: Batch = { ...batch(), date: testDate }

export function createShallowMount<Props>(
  Component: FunctionComponent<Props>,
  props: Props
): (update?: Partial<Props>) => ShallowWrapper<Props> {
  return update => shallow(<Component {...{ ...props, ...(update || {}) }} />)
}

export function simulateInput<P>(input: ShallowWrapper<P>, value: string | string[] | boolean | { event: boolean | object | null }): void {
  let e: unknown
  if (typeof value === 'string') {
    e = { target: { value } }
  } else if (typeof value === 'boolean') {
    e = { target: { checked: value } }
  } else if (Array.isArray(value)) {
    e = value.map(value => ({ value }))
  } else if (typeof value === 'object') {
    e = value.event
  }
  const callback = input.prop('onInput') as (e: unknown) => void
  callback(e)
}

export function mockApplicationState(state: State = initialState, onChange: (s: State) => void = () => undefined): void {
  let currentState = state
  jest.spyOn(ApplicationState, 'useApplicationState').mockImplementation(() => [
    currentState,
    mutation => {
      currentState = produce(currentState, d => {
        mutation(d)
      })
      onChange(currentState)
    },
  ])
}
