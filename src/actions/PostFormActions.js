import { createPost } from './PostActions'

export const submitPostForm = (title, body, token) => {
  return (dispatch) => {
    dispatch(createPost({
      post: {
        title,
        body
      }
    }, token))
  }
}
