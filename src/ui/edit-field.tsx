import { h } from 'preact'
import { Option } from 'lazy-space'

import './ui.css'
import { eventValue } from '../preact-helpers'

export interface Props {
  placeholder?: string
  value?: string
  type?: 'text' | 'number'
  narrow?: boolean
  disabled?: boolean
  removePadding?: boolean
  inherit?: boolean
  onInput: (value: string) => void
}

export default (props: Props) => {
  const className = props.inherit ? 'input editable-field' : 'input'
  const style: h.JSX.CSSProperties = {}
  if (props.removePadding) {
    style['padding'] = 0
  }
  if (props.narrow) {
    style['width'] = 'fit-content'
  }
  return (
    <input
      className={className}
      size={Option.of(props.value || props.placeholder)
        .map(s => s.length || 1)
        .getOrElse(undefined)}
      style={style}
      type={props.type || 'text'}
      disabled={props.disabled}
      placeholder={props.placeholder}
      value={props.value}
      onInput={e => eventValue(e).map(props.onInput)}
    />
  )
}
