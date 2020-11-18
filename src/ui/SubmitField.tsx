import * as React from 'react'

import './ui.css'

export interface Props {
  placeholder?: string
  type?: 'text' | 'number'
  buttonText?: string
  onSubmit: (value: string) => void
}

export interface ComponentState {
  value: string
}

export class SubmitField extends React.Component<Props, ComponentState> {
  readonly state: ComponentState = { value: '' }

  renderInput(): JSX.Element {
    return (
      <input
        className="input"
        type={this.props.type || 'text'}
        placeholder={this.props.placeholder}
        value={this.state.value}
        onChange={(e) => this.setState({ value: e.target.value })}
      />
    )
  }

  renderNarrow(): JSX.Element {
    return this.renderInput()
  }

  renderRegular(): JSX.Element {
    return (
      <div className="field has-addons">
        <div className="control">{this.renderInput()}</div>
        <div className="control">
          <button type="submit" className="button is-info">
            {this.props.buttonText}
          </button>
        </div>
      </div>
    )
  }

  render(): JSX.Element {
    return (
      <form
        onSubmit={() => {
          this.props.onSubmit(this.state.value)
          this.setState({ value: '' })
        }}
      >
        {this.props.buttonText ? this.renderRegular() : this.renderNarrow()}
      </form>
    )
  }
}

export default SubmitField
