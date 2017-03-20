import { SET_POST_TITLE, SET_POST_BODY } from '../actions/PostFormActions'

const initialPostFormState = {
  title: '',
  body: ''
}

const postForms = (state = initialPostFormState, action) => {
  switch (action.type) {
    case SET_POST_TITLE:
      return Object.assign({}, state, { title: action.form.title })
    case SET_POST_BODY:
      return Object.assign({}, state, { body: action.form.body })
    default:
      return state
  }
}

export default postForms
