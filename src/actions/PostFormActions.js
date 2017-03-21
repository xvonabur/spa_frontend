import { createPost } from './PostActions'

export function submitPostForm (title, body) {
  return (dispatch) => {
    dispatch(createPost({
      post: {
        title,
        body
      }
    }))
  }
}
