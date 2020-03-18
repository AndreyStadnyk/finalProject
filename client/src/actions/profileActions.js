import api from '../helpers/FetchData'

export const profileTypes = {
  FETCH_USER_PENDING: 'FETCH_USER_PENDING',
  FETCH_USER_SUCCESS: 'FETCH_USER_SUCCESS',
  UPDATE_USER: 'UPDATE_USER'
}

export function fetchCurrentUser () {
  return dispatch => {
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
}

export function updateUser (user) {
  const data = { ...user }

  return dispatch => api.put(`/api/users`, data)
    .then(dispatch({
      type: profileTypes.UPDATE_USER,
      payload: data
    }))
}
