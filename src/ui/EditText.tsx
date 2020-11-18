import * as React from 'react'

import './ui.css'

export interface Props {
  placeholder?: string
  value?: string
  onChange: (value: string) => void
}

export class EditText extends React.Component<Props> {
  render(): JSX.Element {
    return (
      <textarea
        className="textarea"
        placeholder={this.props.placeholder}
        value={this.props.value}
        onChange={(e) => this.props.onChange(e.target.value)}
        rows={1}
      />
    )
  }
}

export default EditText
