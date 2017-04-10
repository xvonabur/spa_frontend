import { createPost } from './PostActions'

export const submitPostForm = (title, body, token, image = null) => {
  return (dispatch) => {
    dispatch(createPost({
      post: {
        title,
        body,
        image
      }
    }, token))
  }
}
