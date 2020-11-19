import { Option } from 'lazy-space'
import * as React from 'react'

export interface OuterProps {
  value?: string
  placeholder: string
  options: { id: string; label: string }[]
  onSelect: (id: string) => void
}
export type Props = OuterProps

export interface ComponentState {
  isOpen: boolean
}

export class Select extends React.Component<Props, ComponentState> {
  readonly state: ComponentState = { isOpen: false }

  render(): JSX.Element {
    return (
      <div className={`dropdown ${this.state.isOpen ? 'is-active' : ''}`}>
        <div className="dropdown-trigger">
          <button
            className="button"
            aria-haspopup="true"
            aria-controls="dropdown-menu"
            onClick={() => this.setState({ isOpen: !this.state.isOpen })}
          >
            <span>
              {Option.of(this.props.value)
                .map((id) => this.props.options.find((o) => o.id === id))
                .map((o) => o.label || o.id)
                .getOrElse(this.props.placeholder)}
            </span>
            <span className="icon is-small">
              <i className="fas fa-angle-down" aria-hidden="true"></i>
            </span>
          </button>
        </div>
        <div className="dropdown-menu" id="dropdown-menu" role="menu">
          <div className="dropdown-content">
            {this.props.options.map(({ id, label }) => (
              <a
                key={id}
                className={`dropdown-item ${id === this.props.value ? 'is-active' : ''}`}
                onClick={() => {
                  this.props.onSelect(id)
                  this.setState({ isOpen: false })
                }}
              >
                {label || id}
              </a>
            ))}
          </div>
        </div>
      </div>
    )
  }
}

export default Select
