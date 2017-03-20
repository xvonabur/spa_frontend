import { ADD_POST, REMOVE_POST, FETCH_ALL_POSTS, POST_REQ_HAS_ERRORED } from '../actions/PostActions'

const initialPostState = {
  list: [],
  hasErrored: false
}

const posts = (state = initialPostState, action) => {
  switch (action.type) {
    case ADD_POST:
      return Object.assign({}, state, { list: state.list.concat(action.post), hasErrored: false })
    case REMOVE_POST:
      return Object.assign(
        {}, state, { list: state.list.filter(post => post.id !== action.post.id), hasErrored: false }
      )
    case FETCH_ALL_POSTS:
      return Object.assign({}, state, { list: action.posts, hasErrored: false })
    case POST_REQ_HAS_ERRORED:
      return Object.assign({}, state, { hasErrored: true })
    default:
      return state
  }
}

export default posts
