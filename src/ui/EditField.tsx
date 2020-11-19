import { Option } from 'lazy-space'
import * as React from 'react'

import './ui.css'

export interface Props {
  placeholder?: string
  value?: string
  type?: 'text' | 'number'
  narrow?: boolean
  removePadding?: boolean
  onChange: (value: string) => void
}

export class EditField extends React.Component<Props> {
  render(): JSX.Element {
    return (
      <input
        className="input editable-field"
        size={Option.of(this.props.value)
          .filter(() => this.props.narrow === true)
          .map((s) => s.length || 1)
          .getOrElse(undefined)}
        style={this.props.removePadding ? { padding: 0 } : {}}
        type={this.props.type || 'text'}
        placeholder={this.props.placeholder}
        value={this.props.value}
        width={this.props.narrow ? 'fit-content' : undefined}
        onChange={(e) => this.props.onChange(e.target.value)}
      />
    )
  }
}

export default EditField
