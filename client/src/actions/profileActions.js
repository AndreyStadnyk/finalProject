import api from '../helpers/FetchData'

export const profileTypes = {
  UPDATE_USER: 'UPDATE_USER',
  UPDATE_POST: 'UPDATE_POST'
}

export function updateUser (user) {
  const data = { ...user }

  return dispatch => api.put(`/api/users`, data)
    .then(dispatch({
      type: profileTypes.UPDATE_USER,
      payload: data
    }))
}

export function updatePost (post) {
  const data = {
    date: post.date,
    text: post.text
  }

  return dispatch => api.put(`/api/posts/${post.id}`, data)
    .then(dispatch({
      type: profileTypes.UPDATE_POST,
      payload: data
    }))
}
