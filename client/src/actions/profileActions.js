import api from '../helpers/FetchData'

export const profileTypes = {
  FETCH_USER_PENDING: 'FETCH_USER_PENDING',
  FETCH_USER_SUCCESS: 'FETCH_USER_SUCCESS',
  UPDATE_USER: 'UPDATE_USER'
}

export const createUser = (frmDetails, formData) => dispatch => {
  dispatch({
    type: profileTypes.FETCH_USER_PENDING
  })
  api.post('/api/users', frmDetails)
    .then(() => api.post('/auth', formData)
      .then(() => dispatch(fetchCurrentUser())))
}

export const logUser = frmDetails => dispatch => {
  dispatch({
    type: profileTypes.FETCH_USER_PENDING
  })
  api.post('/auth', frmDetails)
    .then(() => dispatch(fetchCurrentUser()))
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

export function updateUser (frmDetails) {
  return dispatch => api.put(`/api/users`, frmDetails)
    .then(dispatch({
      type: profileTypes.UPDATE_USER,
      payload: frmDetails
    }))
}
