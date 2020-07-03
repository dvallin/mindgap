import * as React from 'react'
import { PositionService } from './services/location'
import { GeocodingService } from './services/geocoding'
import { StorageService } from './services/storage'

export interface Services {
  positionService: PositionService
  geocodingService: GeocodingService
  storageService: StorageService
}

export const Services = React.createContext<Services | undefined>(undefined)

export const injectServices = <P extends unknown>(WrappedComponent: React.ComponentType<P & Services>): React.ComponentType<P> => (
  props
) => <Services.Consumer>{(services) => services && <WrappedComponent {...services} {...props} />}</Services.Consumer>

export default Services
