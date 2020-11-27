import { h } from 'preact'
import { eventValue } from '../preact-helpers'

import './ui.css'

export interface Props {
  placeholder?: string
  value?: string
  disabled?: boolean
  onInput: (value: string) => void
}

export default (props: Props) => (
  <textarea
    className="textarea"
    placeholder={props.placeholder}
    value={props.value}
    disabled={props.disabled}
    onInput={e => eventValue(e).map(props.onInput)}
    rows={1}
  />
)
