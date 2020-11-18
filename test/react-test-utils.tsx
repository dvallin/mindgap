import * as React from 'react'
import { CommonWrapper, ReactWrapper, ShallowWrapper, shallow, mount } from 'enzyme'
import { RouteComponentProps } from 'react-router-dom'
import produce, { Draft } from 'immer'
import { Action, Dispatch, State, Thunk } from '../src/store'

export function changeInput(input: CommonWrapper, value: string): void {
  const element = input.getDOMNode<HTMLInputElement>()
  element.value = value
  input.simulate('change')
}

export function simulateChange<P>(
  input: ReactWrapper<P> | ShallowWrapper<P>,
  // eslint-disable-next-line @typescript-eslint/ban-types
  value: string | string[] | boolean | { event: boolean | object | null }
): void {
  let e: unknown
  if (typeof value === 'string') {
    e = { target: { value } }
  } else if (typeof value === 'boolean') {
    e = { target: { checked: value } }
  } else if (Array.isArray(value)) {
    e = value.map((value) => ({ value }))
  } else if (typeof value === 'object') {
    e = value.event
  }
  const change = input.prop('onChange') as (e: unknown) => void
  change(e)
}

export function simulateClick<P extends React.HTMLAttributes<HTMLElement>>(input: ReactWrapper<P> | ShallowWrapper<P>): void {
  const click = input.prop('onClick')
  expect(click).toBeDefined()
  if (click) {
    click({} as React.MouseEvent<HTMLElement>)
  }
}
export function simulateMouseEvent<P extends React.HTMLAttributes<HTMLElement>>(
  input: ReactWrapper<P> | ShallowWrapper<P>,
  key: 'onMouseDown' | 'onMouseMove' | 'onMouseUp' | 'onMouseLeave' | 'onMouseEnter' | 'onMouseOver' | 'onMouseOut',
  modifyEvent: (draft: Draft<React.MouseEvent>) => void = () => undefined
): void {
  const handler = input.prop(key)
  expect(handler).toBeDefined()
  if (handler) {
    handler(
      produce({} as React.MouseEvent<HTMLElement>, (e) => {
        modifyEvent(e)
      })
    )
  }
}

export function simulateSubmit<P>(input: ReactWrapper<P> | ShallowWrapper<P>): void {
  const submit = input.prop('onSubmit') as () => void
  submit()
}

export function mockRouteComponentProps<Params>(
  params: Params,
  mocks: Partial<{ push: jest.Mock; goBack: jest.Mock }> = {}
): RouteComponentProps<Params> {
  const { push, goBack } = { push: jest.fn(), goBack: jest.fn(), ...mocks }
  return {
    history: { push, goBack } as never,
    location: {} as never,
    match: { params } as never,
  }
}

// eslint-disable-next-line @typescript-eslint/ban-types
export function createShallowMount<P, S = {}>(
  Component: React.ComponentType<P>,
  defaults: P,
  children?: JSX.Element
): (props?: Partial<P>) => ShallowWrapper<P, S> {
  return (props = {}) => {
    const p: P = { ...defaults, ...props }
    return shallow(<Component {...p}>{children}</Component>)
  }
}

// eslint-disable-next-line @typescript-eslint/ban-types
export function createMount<P, S = {}>(Component: React.ComponentType<P>, defaults: P): (props?: Partial<P>) => ReactWrapper<P, S> {
  return (props = {}) => {
    const p: P = { ...defaults, ...props }
    return mount(<Component {...p} />)
  }
}

export function runThunk(thunk: Thunk, dispatch: Dispatch, getState: () => State): void {
  thunk(dispatch, getState, '' as Action['type'])
}
