import produce from 'immer'
import { Fragment, h } from 'preact'

import { Name } from '.'
import EditField from '../ui/edit-field'

export interface Props {
  name: Name
  updateName: (name: Name) => void
}

export default (props: Props) => (
  <Fragment>
    <h1 className="title">
      <EditField
        placeholder="Name"
        value={props.name.name}
        onInput={value =>
          props.updateName(
            produce(props.name, d => {
              d.name = value
            })
          )
        }
        inherit
        removePadding
      />
    </h1>
    <h2 className="subtitle">
      <EditField
        placeholder="Description"
        value={props.name.description}
        onInput={value =>
          props.updateName(
            produce(props.name, d => {
              d.description = value
            })
          )
        }
        inherit
        removePadding
      />
    </h2>
  </Fragment>
)
