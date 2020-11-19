import { ReactNode } from 'react'

export type ChildrenProps = Readonly<{ children?: ReactNode }>

export interface BaseAction<Module, Name> {
  module: Module
  type: Name
}
