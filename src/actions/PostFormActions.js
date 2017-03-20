export const SET_POST_TITLE = 'SET_POST_TITLE'
export const SET_POST_BODY = 'SET_POST_BODY'

export const setPostTitleAction = (formObj) => ({
  type: SET_POST_TITLE,
  form: {
    title: formObj.title
  }
})

export const setPostBodyAction = (formObj) => ({
  type: SET_POST_BODY,
  form: {
    body: formObj.body
  }
})
