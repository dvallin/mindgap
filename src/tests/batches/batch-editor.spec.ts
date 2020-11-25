import BatchEditor from '../../batches/batch-editor'

import { initialState, State } from '../../state'

import NotFound from '../../pages/not-found'
import produce from 'immer'
import { createShallowMount, mockApplicationState, simulateInput, testBatch } from '../test-utils'
import NameEditor, { Props } from '../../name/name-editor'

describe('App', () => {
  const mount = createShallowMount(BatchEditor, { id: 'batch1' })

  it('renders not found', () => {
    const component = mount()
    expect(component).toMatchSnapshot()
    expect(component.exists(NotFound)).toBeTruthy()
  })

  describe('with found batch', () => {
    let state: State
    beforeEach(() => {
      mockApplicationState(
        produce(initialState, s => {
          s.batches['batch1'] = produce(testBatch, b => {
            b.recipe = { id: 'recipe1', scale: 1 }
          })
        }),
        s => (state = s)
      )
    })

    it('renders batch', () => {
      const component = mount()

      expect(component).toMatchSnapshot()
      expect(component.exists(NotFound)).toBeFalsy()
    })

    it('updates name', () => {
      const component = mount()

      component.find<Props>(NameEditor).prop('updateName')({ name: 'new name', description: 'new description' })

      expect(state).toMatchObject({ batches: { batch1: { name: 'new name', description: 'new description' } } })
    })

    it('updates recipe scale', () => {
      const component = mount()

      simulateInput(component.find('[data-testid="recipe-scale-input"]'), '12')

      expect(state).toMatchObject({ batches: { batch1: { recipe: { scale: 12 } } } })
    })
  })
})
