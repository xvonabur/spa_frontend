import { UserAuthWrapper } from 'redux-auth-wrapper'

export function checkHttpStatus (response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    const error = new Error(response.statusText)
    error.response = response
    throw error
  }
}

export const AuthenticatedOrGuest = (Component, FailureComponent = null) => UserAuthWrapper({
  authSelector: state => state.auth,
  predicate: auth => auth.isAuthenticated,
  wrapperDisplayName: 'AuthenticatedOrElse',
  FailureComponent
})(Component)
