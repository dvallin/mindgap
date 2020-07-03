import * as React from 'react'
import { render } from 'react-dom'

import { Provider } from 'react-redux'

import { createStore } from './store'
const store = createStore()

import App from './App'
import Services from './Services'
import { WebPositionService } from './services/location'
import { Nominatim } from './services/geocoding'
import { LocalStorageService } from './services/storage'

const services: Services = {
  positionService: new WebPositionService(),
  geocodingService: new Nominatim(),
  storageService: new LocalStorageService(),
}

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then((registration) => {
        console.log('SW registered: ', registration)
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError)
      })
  })
}

render(
  <Services.Provider value={services}>
    <Provider store={store}>
      <App />
    </Provider>
  </Services.Provider>,
  document.getElementById('root')
)
