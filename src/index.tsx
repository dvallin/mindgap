import * as React from 'react'
import 'react-datepicker/dist/react-datepicker.css'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'

import App from './App'
import Services from './Services'
import { createStore } from './store'

const services: Services = {}

const store = createStore()

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
