import { h } from 'preact'
import { Option } from 'lazy-space'

import './ui.css'
import { eventValue } from '../preact-helpers'

export interface Props {
  placeholder?: string
  value?: string
  type?: 'text' | 'number'
  narrow?: boolean
  removePadding?: boolean
  onInput: (value: string) => void
}

export default (props: Props) => (
  <input
    className="input editable-field"
    size={Option.of(props.value)
      .filter(() => props.narrow === true)
      .map(s => s.length || 1)
      .getOrElse(undefined)}
    style={props.removePadding ? { padding: 0 } : {}}
    type={props.type || 'text'}
    placeholder={props.placeholder}
    value={props.value}
    width={props.narrow ? 'fit-content' : undefined}
    onInput={e => eventValue(e).map(props.onInput)}
  />
)
