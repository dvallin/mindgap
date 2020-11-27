import { h } from 'preact'
import { useState } from 'preact/hooks'
import { Option } from 'lazy-space'

export interface Props {
  value?: string
  placeholder: string
  options: { id: string; label: string }[]
  disabled?: boolean
  onSelect: (id: string) => void
}

export default (props: Props) => {
  const [open, setOpen] = useState(false)
  return (
    <div className={`dropdown ${open ? 'is-active' : ''}`}>
      <div className="dropdown-trigger">
        <button
          disabled={props.disabled}
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setOpen(!open)}
        >
          <span>
            {Option.of(props.value)
              .map(id => props.options.find(o => o.id === id))
              .map(o => o.label || o.id)
              .getOrElse(props.placeholder)}
          </span>
          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true"></i>
          </span>
        </button>
      </div>
      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {props.options.map(({ id, label }) => (
            <a
              disabled={props.disabled}
              key={id}
              className={`dropdown-item ${id === props.value ? 'is-active' : ''}`}
              onClick={() => {
                props.onSelect(id)
                setOpen(false)
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
