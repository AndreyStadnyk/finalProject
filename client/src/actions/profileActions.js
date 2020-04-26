import api from '../helpers/FetchData'

export const profileTypes = {
  FETCH_USER_PENDING: 'FETCH_USER_PENDING',
  FETCH_USER_SUCCESS: 'FETCH_USER_SUCCESS',
  UPDATE_USER: 'UPDATE_USER',
  CREATE_USER: 'CREATE_USER',
    LOG_USER: 'LOG_USER'
}

export function createUser (frmDetails) {
  return dispatch => api.post('/api/users', frmDetails)
    .then(() => dispatch({
      type: profileTypes.CREATE_USER,
      payload: frmDetails

    }))
}
export function logeUser(frmDetails) {
    return dispatch => api.post('/auth', frmDetails)
        .then(() => dispatch({
            type: profileTypes.LOG_USER,
            payload: frmDetails
        }))
}
export const fetchCurrentUser = () => dispatch => {
  dispatch({
    type: profileTypes.FETCH_USER_PENDING
  })

  api.get(`/api/users/current`)
    .then(res => {
      dispatch({
        type: profileTypes.FETCH_USER_SUCCESS,
        payload: res
      })
      return res
    })
}

export function updateUser (user) {
  const data = {...user}

  return dispatch => api.put(`/api/users`, data)
    .then(dispatch({
      type: profileTypes.UPDATE_USER,
      payload: data
    }))
}
