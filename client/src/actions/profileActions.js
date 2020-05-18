import api from '../helpers/FetchData'

export const profileTypes = {
  FETCH_USER_PENDING: 'FETCH_USER_PENDING',
  FETCH_USER_SUCCESS: 'FETCH_USER_SUCCESS',
  UPDATE_USER_PAGE: 'UPDATE_USER_PAGE',
  UPDATE_USER: 'UPDATE_USER',
  RESET_PASSWORD_EMAIL_PENDING: 'RESET_PASSWORD_EMAIL_PENDING',
  RESET_PASSWORD_EMAIL_SUCCESS: 'RESET_PASSWORD_EMAIL_SUCCESS',
  RESET_PASSWORD_PENDING: 'RESET_PASSWORD_PENDING',
  RESET_PASSWORD_SUCCESS: 'RESET_PASSWORD_SUCCESS',
  FETCH_ANOTHER_USER: 'FETCH_ANOTHER_USER'
}

export const createUser = (frmDetails, formData) => dispatch => {
  dispatch({ type: profileTypes.FETCH_USER_PENDING })
  api.post('/api/users', frmDetails)
    .then(() => api.post('/auth', formData)
      .then(() => dispatch(fetchCurrentUser())))
}

export const logUser = frmDetails => dispatch => {
  dispatch({ type: profileTypes.FETCH_USER_PENDING })
  api.post('/auth', frmDetails)
    .then(() => dispatch(fetchCurrentUser()))
}

export const resetPassword = email => dispatch => {
  dispatch({ type: profileTypes.RESET_PASSWORD_EMAIL_PENDING })
  api.post('/api/users/resetPassword', { email })
    .then(() => dispatch({ type: profileTypes.RESET_PASSWORD_EMAIL_SUCCESS }))
}

export const changePassword = () => dispatch => {
  dispatch({ type: profileTypes.RESET_PASSWORD_PENDING })
  api.get(`/api/users/changePassword`)
    .then(() => {
      dispatch({ type: profileTypes.RESET_PASSWORD_SUCCESS })
      fetchCurrentUser()
    })
}

export const fetchCurrentUser = () => dispatch => {
  dispatch({ type: profileTypes.FETCH_USER_PENDING })

  api.get(`/api/users/current`)
    .then(res => {
      dispatch({
        type: profileTypes.FETCH_USER_SUCCESS,
        payload: res
      })
      return res
    })
}

export function updateUser (frmDetails) {
  return dispatch => api.put(`/api/users`, frmDetails)
    .then(dispatch({
      type: profileTypes.UPDATE_USER,
      payload: frmDetails
    }))
}

export const fetchAnotherUser = (username) =>
  dispatch => {
    api.get(`/api/users/${username}`)
      .then(res => {
        dispatch({
          type: profileTypes.FETCH_ANOTHER_USER,
          payload: res
        })
        return res
      })
  }
