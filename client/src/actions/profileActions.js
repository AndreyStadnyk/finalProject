import api from '../helpers/FetchData'

export const profileTypes = {
  SET_CURRENT_USER: 'SET_CURRENT_USER',
  UPDATE_USER: 'UPDATE_USER'
}

export function updateUser (user) {
  const data = { ...user }

  return dispatch => api.put(`/api/users`, data)
    .then(dispatch({
      type: profileTypes.UPDATE_USER,
      payload: data
    }))
}
