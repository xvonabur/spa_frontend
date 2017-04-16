import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import posts from './posts'
import auth from './auth'
import locale from './locale'
import user from './user'

const rootReducer = combineReducers({
  posts,
  auth,
  user,
  locale,
  routing: routerReducer
})

export default rootReducer
