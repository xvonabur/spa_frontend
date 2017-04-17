import { CHANGE_LOCALE } from '../actions/LangActions'

const locale = (state = {}, action) => {
  switch (action.type) {
    case CHANGE_LOCALE:
      return {
        lang: action.lang,
        messages: action.messages
      }
    default:
      return state
  }
}

export default locale
