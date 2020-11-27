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
  return (
    <input
      className={className}
      size={Option.of(props.value || props.placeholder)
        .map(s => s.length || 1)
        .filter(() => props.narrow === true)
        .getOrElse(undefined)}
      style={props.removePadding ? { padding: 0 } : {}}
      type={props.type || 'text'}
      disabled={props.disabled}
      placeholder={props.placeholder}
      value={props.value}
      width={props.narrow ? 'fit-content' : undefined}
      onInput={e => eventValue(e).map(props.onInput)}
    />
  )
}
