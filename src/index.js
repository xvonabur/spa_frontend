import React from 'react'
import ReactDOM from 'react-dom'
import configureStore from './store/configureStore'
import Root from './containers/Root'
import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import rg4js from 'raygun4js'
import 'bootstrap/dist/css/bootstrap.css'

rg4js('enableCrashReporting', true)
rg4js('apiKey', process.env.RAYGUN_KEY)

// Store
const store = configureStore(browserHistory)
const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(
  <Root store={store} history={history} />,
  document.getElementById('root')
)
