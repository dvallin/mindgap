import { h } from 'preact'
import { eventValue } from '../preact-helpers'

import './ui.css'

export interface Props {
  placeholder?: string
  value?: string
  onInput: (value: string) => void
}

export default (props: Props) => (
  <textarea
    className="textarea"
    placeholder={props.placeholder}
    value={props.value}
    onInput={e => eventValue(e).map(props.onInput)}
    rows={1}
  />
)
