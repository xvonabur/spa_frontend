import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import posts from './posts'
import auth from './auth'

const rootReducer = combineReducers({
  posts,
  auth,
  routing: routerReducer
})

export default rootReducer
