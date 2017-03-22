import { ADD_POST } from '../actions/PostActions'

const post = (state, action) => {
  switch (action.type) {
    case ADD_POST:
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
