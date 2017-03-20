import { ADD_POST } from '../actions/PostActions'

const posts = (state = {}, action) => {
  switch (action.type) {
    case ADD_POST:
      console.log('Hello redux!')
      return state
    default:
      return state
  }
}

export default posts
