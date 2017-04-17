import { UPDATE_USER, SHOW_USER } from '../actions/UserActions'

const user = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_USER:
    case SHOW_USER:
      return {
        ...state,
        ...action.user
      }
    default:
      return state
  }
}

export default user
