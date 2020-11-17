import * as React from 'react'
import { Route } from 'react-router-dom'

import RecipePage from './recipes/RecipePage'
import BatchPage from './batches/BatchPage'

export default (): JSX.Element => (
  <div className="container">
    <Route exact path="/recipes/:id?" component={RecipePage} />
    <Route exact path="/batches/:id?" component={BatchPage} />
  </div>
)
