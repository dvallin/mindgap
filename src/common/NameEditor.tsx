import * as React from 'react'

import { Name } from '.'
import EditField from '../ui/EditField'

export interface Props extends Name {
  updateName: (name: Name) => void
}

export class NameEditor extends React.Component<Props> {
  render(): JSX.Element {
    return (
      <>
        <h1 className="title">
          <EditField
            placeholder="Name"
            value={this.props.name}
            onChange={(value) => this.props.updateName({ name: value, description: this.props.description })}
            removePadding
          />
        </h1>
        <h2 className="subtitle">
          <EditField
            placeholder="Description"
            value={this.props.description}
            onChange={(value) => this.props.updateName({ name: this.props.name, description: value })}
            removePadding
          />
        </h2>
      </>
    )
  }
}

export default NameEditor
