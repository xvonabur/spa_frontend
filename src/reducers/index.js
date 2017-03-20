import { combineReducers } from 'redux'
import posts from './posts'
import postForms from './postForms'

const rootReducer = combineReducers({
  posts,
  postForms
})

export default rootReducer
