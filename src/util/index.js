import { UserAuthWrapper } from 'redux-auth-wrapper'
import { loadState } from '../localStorage'

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

export const currentLang = () => {
  const stateLocale = loadState().locale.lang
  if (stateLocale !== '' && stateLocale !== undefined) {
    return stateLocale
  } else {
    return getBrowserLang()
  }
}

const getBrowserLang = () => {
  // Define user's language. Different browsers have the user locale defined
  // on different fields on the `navigator` object, so we make sure to account
  // for these different by checking all of them
  const language = (navigator.languages && navigator.languages[0]) ||
    navigator.language ||
    navigator.userLanguage

  // Split locales with a region code
  return language.toLowerCase().split(/[_-]+/)[0]
}
