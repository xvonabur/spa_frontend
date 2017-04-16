import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../reducers'
import createLogger from 'redux-logger'
import { loadState, saveState } from '../localStorage'
import throttle from 'lodash/throttle'
import { routerMiddleware } from 'react-router-redux'
import { browserHistory } from 'react-router'

const logger = createLogger()
const configureStore = () => {
  const router = routerMiddleware(browserHistory)
  const preloadedState = loadState()
  const store = createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(router, thunk, logger)
  )

  store.subscribe(throttle(() => {
    saveState({
      posts: store.getState().posts,
      auth: store.getState().auth,
      locale: store.getState().locale
    })
  }, 1000))

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}

export default configureStore
