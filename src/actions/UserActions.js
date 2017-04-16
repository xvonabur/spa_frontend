import { checkHttpStatus } from '../util/index'
import jwtDecode from 'jwt-decode'
import rg4js from 'raygun4js'
import { changeLocale } from './LangActions'

export const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST'
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE'
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS'
export const LOGOUT_USER = 'LOGOUT_USER'
export const UPDATE_USER = 'UPDATE_USER'
export const SHOW_USER = 'SHOW_USER'

const BASE_URL = process.env.API_URL
const API_VERSION = process.env.API_VERSION
const API_CONTENT_TYPE = process.env.API_CONTENT_TYPE
const ACCEPT_HEADER = `${API_CONTENT_TYPE}; version=2${API_VERSION}`

export function loginUserSuccess (token, userId) {
  return {
    type: LOGIN_USER_SUCCESS,
    payload: {
      token: token,
      userId: userId
    }
  }
}

export function loginUserFailure (error) {
  console.log('err', error)
  return {
    type: LOGIN_USER_FAILURE
  }
}

export function loginUserRequest () {
  return {
    type: LOGIN_USER_REQUEST
  }
}

export function logout () {
  return {
    type: LOGOUT_USER
  }
}

export function updateUserAction (user) {
  return {
    type: UPDATE_USER,
    user
  }
}

export function showUserAction (user) {
  return {
    type: SHOW_USER,
    user
  }
}

export const loginUser = (email, password) => {
  return (dispatch) => {
    dispatch(loginUserRequest())
    fetch(`${BASE_URL}/user_token.json`, {
      method: 'POST',
      headers: {
        'Accept': ACCEPT_HEADER,
        'Content-Type': API_CONTENT_TYPE
      },
      body: JSON.stringify({auth: {email: email, password: password}})
    })
    .then(checkHttpStatus)
    .then(response => {
      return response.json()
    })
    .then(response => {
      try {
        const decoded = jwtDecode(response.jwt)
        dispatch(loginUserSuccess(response.jwt, decoded.sub))
        dispatch(showUser(response.jwt, decoded.sub))
      } catch (e) {
        dispatch(loginUserFailure({
          response: {
            status: 403,
            statusText: 'Invalid token'
          }
        }))
      }
    })
    .catch(error => {
      rg4js('send', error)
      dispatch(loginUserFailure(error))
    })
  }
}

export const updateUser = (token, userId, newAttrs) => {
  let formData = new FormData()

  for (let name in newAttrs) {
    formData.append(`user[${name}]`, newAttrs[name])
  }

  return (dispatch) => {
    fetch(`${BASE_URL}/users/${userId}.json`, {
      method: 'PUT',
      headers: {
        'Accept': ACCEPT_HEADER,
        'Authorization': `Bearer ${token}`
      },
      body: formData
    }).then(response => {
      return response.json()
    }).then((json) => {
      return json['data']['attributes']
    }).then(user => {
      dispatch(updateUserAction(user))
    }).catch(err => {
      console.error(err.toString())
    })
  }
}

export const showUser = (token, userId) => {
  return (dispatch) => {
    fetch(`${BASE_URL}/users/${userId}.json`, {
      method: 'GET',
      headers: {
        'Accept': ACCEPT_HEADER,
        'Authorization': `Bearer ${token}`
      }
    }).then(response => {
      return response.json()
    }).then((json) => {
      return json['data']['attributes']
    }).then(user => {
      dispatch(showUserAction(user))
      return user
    }).then(user => {
      dispatch(changeLocale(user.locale))
    }).catch(err => {
      console.error(err.toString())
    })
  }
}
