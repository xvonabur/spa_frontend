import { checkHttpStatus } from '../util/index'
import jwtDecode from 'jwt-decode'
import rg4js from 'raygun4js'

export const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST'
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE'
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS'
export const LOGOUT_USER = 'LOGOUT_USER'

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
