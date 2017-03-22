import { createPost } from './PostActions'

export const submitPostForm = (title, body) => {
  return (dispatch) => {
    dispatch(createPost({
      post: {
        title,
        body
      }
    }))
  }
}
