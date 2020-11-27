import { h } from 'preact'
import { useState } from 'preact/hooks'

import EditField from './edit-field'

import './ui.css'

export interface Props {
  placeholder?: string
  type?: 'text' | 'number'
  buttonText?: string
  onSubmit: (value: string) => void
}

export default (props: Props) => {
  const [value, setValue] = useState('')

  return (
    <form
      onSubmit={() => {
        props.onSubmit(value)
        setValue('')
      }}
    >
      {props.buttonText ? (
        <div className="field has-addons">
          <div className="control">
            <EditField value={value} placeholder={props.placeholder} type={props.type} onInput={setValue} />
          </div>
          <div className="control">
            <button type="submit" className="button is-info">
              {props.buttonText}
            </button>
          </div>
        </div>
      ) : (
        <EditField value={value} placeholder={props.placeholder} type={props.type} onInput={setValue} />
      )}
    </form>
  )
}
