import api from '../helpers/FetchData'

export const postTypes = {
  UPDATE_POST: 'UPDATE_POST',
  SWITCH_LIKE: 'SWITCH_LIKE'
}

export function updatePost (post) {
  const data = {
    date: post.date,
    text: post.text
  }

  return dispatch => api.put(`/api/posts/${post.id}`, data)
    .then(dispatch({
      type: postTypes.UPDATE_POST,
      payload: data
    }))
}
