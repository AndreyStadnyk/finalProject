export const profileTypes = {
  UPDATE_USER: 'UPDATE_USER',
  UPDATE_POST: 'UPDATE_POST'
}

export function updateUser (user) {
  const data = {...user}

  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }

  return dispatch => fetch(`http:/localhost:8080/api/users`, options)
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

  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }

  return dispatch => fetch(`http:/localhost:8080/api/posts/${post.id}`, options)
    .then(dispatch({
      type: profileTypes.UPDATE_POST,
      payload: data
    }))
}
