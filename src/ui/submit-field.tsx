import { h } from 'preact'
import { useState } from 'preact/hooks'

import { eventValue } from '../preact-helpers'

import './ui.css'

export interface Props {
  placeholder?: string
  type?: 'text' | 'number'
  buttonText?: string
  onSubmit: (value: string) => void
}

export default (props: Props) => {
  const [value, setValue] = useState('')

  const input = (
    <input
      className="input"
      type={props.type || 'text'}
      placeholder={props.placeholder}
      value={value}
      onInput={e => eventValue(e).map(setValue)}
    />
  )

  const Regular = () => (
    <div className="field has-addons">
      <div className="control">{input}</div>
      <div className="control">
        <button type="submit" className="button is-info">
          {props.buttonText}
        </button>
      </div>
    </div>
  )

  const Narrow = () => input

  return (
    <form
      onSubmit={() => {
        props.onSubmit(value)
        setValue('')
      }}
    >
      {props.buttonText ? <Regular /> : <Narrow />}
    </form>
  )
}
