import { ADD_POST, FETCH_POST } from '../actions/PostActions'

const post = (state, action) => {
  switch (action.type) {
    case ADD_POST:
    case FETCH_POST:
      console.log('action post', action)
      return {
        id: action.post.id,
        title: action.post.title,
        body: action.post.body
      }
    default:
      return state
  }
}

export default post
