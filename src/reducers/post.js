import { ADD_POST, FETCH_POST } from '../actions/PostActions'

const post = (state, action) => {
  switch (action.type) {
    case ADD_POST:
      return {
        ...action.post
      }
    case FETCH_POST:
      return {
        ...action.post
      }
    default:
      return state
  }
}

export default post
