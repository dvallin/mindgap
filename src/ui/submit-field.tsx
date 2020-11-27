import { h } from 'preact'
import { useState } from 'preact/hooks'

import EditField from './edit-field'

import './ui.css'

export interface Props {
  placeholder?: string
  type?: 'text' | 'number'
  buttonText?: string
  disabled?: boolean
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
      disabled={props.disabled}
    >
      {props.buttonText ? (
        <div className="field has-addons">
          <div className="control">
            <EditField disabled={props.disabled} value={value} placeholder={props.placeholder} type={props.type} onInput={setValue} />
          </div>
          <div className="control">
            <button disabled={props.disabled} type="submit" className="button is-info">
              {props.buttonText}
            </button>
          </div>
        </div>
      ) : (
        <EditField disabled={props.disabled} value={value} placeholder={props.placeholder} type={props.type} onInput={setValue} />
      )}
    </form>
  )
}
