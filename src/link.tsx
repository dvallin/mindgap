import { h, RenderableProps } from 'preact'
import { Link } from 'preact-router'
import { makePath } from './path'

export interface Props {
  path: string
  params?: { [key: string]: string }
  inherit?: boolean
}

export default function(props: RenderableProps<Props>) {
  return (
    <Link href={makePath(props.path, props.params)} style={props.inherit ? { color: 'inherit', textDecoration: 'inherit' } : {}}>
      {props.children}
    </Link>
  )
}
