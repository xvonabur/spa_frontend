import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import posts from './posts'
import auth from './auth'
import locale from './locale'

const rootReducer = combineReducers({
  posts,
  auth,
  locale,
  routing: routerReducer
})

export default rootReducer
