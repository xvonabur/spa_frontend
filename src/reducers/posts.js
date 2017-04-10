import { ADD_POST, REMOVE_POST, FETCH_POSTS, POST_REQ_HAS_ERRORED, FETCH_POST,
ADD_FILTER, REMOVE_FILTER} from '../actions/PostActions'
import { combineReducers } from 'redux'
import post from './post'
import omit from 'lodash/omit'

const byId = (state = {}, action) => {
  switch (action.type) {
    case ADD_POST:
    case FETCH_POST:
      return {
        ...state,
        [action.post.id]: post(state[action.post.id], action)
      }
    case REMOVE_POST:
      return omit(state, action.post.id)
    case FETCH_POSTS: // eslint-disable-line no-case-declarations
      let nextState = { ...state }
      action.posts.forEach(post => {
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
      return [...state, action.post.id]
    case REMOVE_POST:
      return state.filter(id => id !== action.post.id)
    case FETCH_POSTS:
      return action.posts.map(post => post.id)
    case FETCH_POST:
      return state.includes(action.post.id) ? state : [...state, action.post.id]
    default:
      return state
  }
}

const pagination = (state = {total: 0, limit: 0, currentPage: 1}, action) => {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        total: state.total + 1
      }
    case REMOVE_POST:
      return {
        ...state,
        total: state.total - 1
      }
    case FETCH_POSTS:
      return {
        ...state,
        total: action.total,
        limit: action.limit,
        currentPage: action.currentPage
      }
    default:
      return state
  }
}

const filters = (state = {}, action) => {
  switch (action.type) {
    case ADD_FILTER:
      return {
        ...state,
        [action.name]: action.value
      }
    case REMOVE_FILTER:
      return {
        ...state,
        [action.name]: ''
      }
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
  pagination,
  filters,
  reqResult
})

export default posts
