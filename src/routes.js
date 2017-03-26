import React from 'react'
import { IndexRoute, Route } from 'react-router'
import App from './containers/App'
import PostPage from './containers/PostPage'
import IndexPage from './containers/IndexPage'
import NotFound from './containers/NotFoundPage'

export const routes = (
  <div>
    <Route path="/" component={App}>
      <IndexRoute component={IndexPage}/>
      <Route path='posts/:id' component={PostPage}/>
    </Route>
    <Route path='*' component={NotFound} />
  </div>
)
