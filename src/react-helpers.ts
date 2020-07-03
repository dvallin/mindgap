import { ReactNode } from 'react'

export type ChildrenProps = Readonly<{ children?: ReactNode }>

export interface BaseAction<Name = string> {
  type: Name
}
