import * as React from 'react'

export interface Services {}

export const Services = React.createContext<Services | undefined>(undefined)

export const injectServices = <P extends unknown>(WrappedComponent: React.ComponentType<P & Services>): React.ComponentType<P> => (
  props: P
) => <Services.Consumer>{(services) => services && <WrappedComponent {...services} {...props} />}</Services.Consumer>

export default Services
