import { checkHttpStatus } from '../util/index'
import jwtDecode from 'jwt-decode'

export const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST'
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE'
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS'
export const LOGOUT_USER = 'LOGOUT_USER'
export const FETCH_PROTECTED_DATA_REQUEST = 'FETCH_PROTECTED_DATA_REQUEST'
export const RECEIVE_PROTECTED_DATA = 'RECEIVE_PROTECTED_DATA'

const BASE_URL = process.env.API_URL

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
        'Accept': 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json'
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
      dispatch(loginUserFailure(error))
    })
  }
}
