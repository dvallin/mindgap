import * as React from 'react'

import './ui.css'

export interface Props {
  placeholder?: string
  value?: string
  type?: 'text' | 'number'
  onChange: (value: string) => void
}

export class EditField extends React.Component<Props> {
  render(): JSX.Element {
    return (
      <input
        className="input field"
        type={this.props.type || 'text'}
        placeholder={this.props.placeholder}
        value={this.props.value}
        onChange={(e) => this.props.onChange(e.target.value)}
      />
    )
  }
}

export default EditField
