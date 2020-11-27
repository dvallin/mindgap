import BatchEditor, { BatchEdit } from '../../batches/batch-editor'

import { initialState, State } from '../../state'

import NotFound from '../../pages/not-found'
import produce from 'immer'
import { createShallowMount, mockApplicationState, testBatch } from '../test-utils'
import NameEditor, { Props as NameProps } from '../../name/name-editor'

describe('BatchEditor', () => {
  const mount = createShallowMount(BatchEditor, { id: 'batch1' })

  it('renders not found', () => {
    const component = mount()
    expect(component).toMatchSnapshot()
    expect(component.exists(NotFound)).toBeTruthy()
  })

  it('renders batch', () => {
    mockApplicationState(
      produce(initialState, s => {
        s.batches['batch1'] = testBatch
      })
    )

    const component = mount()

    expect(component).toMatchSnapshot()
    expect(component.exists(NotFound)).toBeFalsy()
  })
})

describe('BatchEdit', () => {
  const mount = createShallowMount(BatchEdit, { id: 'batch1', batch: testBatch })

  let state: State
  beforeEach(() => {
    mockApplicationState(
      produce(initialState, s => {
        s.batches['batch1'] = testBatch
      }),
      s => (state = s)
    )
  })

  it('renders batch', () => {
    const component = mount()
    expect(component).toMatchSnapshot()
  })

  it('updates names', () => {
    const component = mount()
    component.find<NameProps>(NameEditor).prop('updateName')({ name: 'new name', description: 'new description' })
    expect(state).toMatchObject({ batches: { batch1: { name: 'new name', description: 'new description' } } })
  })
})
