import '@fortawesome/fontawesome-free/js/fontawesome'
import '@fortawesome/fontawesome-free/js/solid'

import * as React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'

import App from './App'
import { loadState, writeState } from './local-storage'
import Services from './Services'
import { createStore } from './store'

const services: Services = {}

const store = createStore(loadState())
store.subscribe(() => writeState(store.getState()))

render(
  <Services.Provider value={services}>
    <Provider store={store}>
      <HashRouter>
        <App />
      </HashRouter>
    </Provider>
  </Services.Provider>,
  document.getElementById('root')
)
