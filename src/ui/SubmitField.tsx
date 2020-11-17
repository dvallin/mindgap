import * as React from 'react'

import './ui.css'

export interface Props {
  placeholder?: string
  type?: 'text' | 'number'
  onSubmit: (value: string) => void
}

export interface ComponentState {
  value: string
}

export class SubmitField extends React.Component<Props, ComponentState> {
  readonly state: ComponentState = { value: '' }

  render(): JSX.Element {
    return (
      <form
        onSubmit={() => {
          this.props.onSubmit(this.state.value)
          this.setState({ value: '' })
        }}
      >
        <input
          className="input field"
          type={this.props.type || 'text'}
          placeholder={this.props.placeholder}
          value={this.state.value}
          onChange={(e) => this.setState({ value: e.target.value })}
        />
      </form>
    )
  }
}

export default SubmitField
