import { ADD_POST, REMOVE_POST, FETCH_ALL_POSTS, POST_REQ_HAS_ERRORED } from '../actions/PostActions'
import { combineReducers } from 'redux'
import post from './post'
import omit from 'lodash/omit'

const byId = (state = {}, action) => {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        [action.id]: post(state[action.id], action)
      }
    case REMOVE_POST:
      return omit(state, action.post.id)
    case FETCH_ALL_POSTS: // eslint-disable-line no-case-declarations
      const nextState = { ...state }
      action.response.forEach(post => {
        nextState[post.id] = post
      })
      return nextState
    default:
      return state
  }
}

const allIds = (state = [], action) => {
  switch (action.type) {
    case ADD_POST:
      return [...state, action.id]
    case REMOVE_POST:
      return state.filter(id => id !== action.post.id)
    case FETCH_ALL_POSTS:
      return action.response.map(post => post.id)
    default:
      return state
  }
}

const reqResult = (state = {}, action) => {
  switch (action.type) {
    case POST_REQ_HAS_ERRORED:
      return {
        hasErrored: true
      }
    default:
      return {
        hasErrored: false
      }
  }
}

const posts = combineReducers({
  byId,
  allIds,
  reqResult
})

export default posts