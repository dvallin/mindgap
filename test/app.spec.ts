import App from '../src/app'
import { createShallowMount } from './test-utils'

describe('App', () => {
  const mount = createShallowMount(App, {})
  it('renders', () => {
    const component = mount()
    expect(component).toMatchSnapshot()
  })
})
