import api from '../helpers/FetchData'

export const profileTypes = {
  FETCH_USER_PENDING: 'FETCH_USER_PENDING',
  FETCH_CURRENT_USER_SUCCESS: 'FETCH_CURRENT_USER_SUCCESS',
  FETCH_ANOTHER_USER_SUCCESS: 'FETCH_ANOTHER_USER_SUCCESS',
  FETCH_USER_FRIENDS_PENDING: 'FETCH_USER_FRIENDS_PENDING',
  FETCH_CURRENT_USER_FRIENDS_SUCCESS: 'FETCH_CURRENT_USER_FRIENDS_SUCCESS',
  FETCH_ANOTHER_USER_FRIENDS_SUCCESS: 'FETCH_ANOTHER_USER_FRIENDS_SUCCESS',
  UPDATE_USER_PAGE: 'UPDATE_USER_PAGE',
  UPDATE_USER: 'UPDATE_USER',
  LOG_OUT_USER: 'LOG_OUT_USER',
  RESET_PASSWORD_PENDING: 'RESET_PASSWORD_PENDING',
  RESET_PASSWORD_SUCCESS: 'RESET_PASSWORD_SUCCESS',
  SEARCH_OTHER_USERS: 'SEARCH_OTHER_USERS',
  PROFILE_PHOTO_CHANGE: 'PROFILE_PHOTO_CHANGE',
  GET_PROFILE_PHOTO: 'GET_PROFILE_PHOTO'
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

export const logOutUser = () => dispatch => {
  dispatch({type: profileTypes.LOG_OUT_USER})
  api.post('/logout')
}

export function findUser (frmDetails) {
  return (dispatch) => {
    api.get('/api/users/search?queryStr=' + frmDetails)
      .then((res) => {
        dispatch({type: profileTypes.SEARCH_OTHER_USERS, payload: res})
      })
  }
}

export const changeProfilePhoto = (frmDetails) => dispatch => {
  dispatch({type: profileTypes.PROFILE_PHOTO_CHANGE})
  api.post('/api/file/user-pic', frmDetails)
}

export const getUserPhoto = (frmDetails) => dispatch => {
  dispatch({type: profileTypes.GET_PROFILE_PHOTO})
  api.get('/api/file/user-pic?username=' + frmDetails)
    .then(res => {
      dispatch({
        type: profileTypes.GET_PROFILE_PHOTO,
        payload: res
      })
      return res
    })
}

export const resetPassword = email => dispatch => {
  dispatch({type: profileTypes.RESET_PASSWORD_PENDING})
  api.post('/api/users/resetPassword', {email})
    .then(() => dispatch({type: profileTypes.RESET_PASSWORD_SUCCESS}))
}

export const changePassword = (username, token, pass1, pass2) => dispatch => {
  dispatch({type: profileTypes.RESET_PASSWORD_PENDING})
  api.get('/api/users/changePassword?username=' +
        username + '&token=' + token + '&pass1=' + pass1 + '&pass2=' + pass2)
    .then(() => dispatch({type: profileTypes.RESET_PASSWORD_SUCCESS}))
}

export const fetchCurrentUser = () => dispatch => {
  dispatch({ type: profileTypes.FETCH_USER_PENDING })

  api.get(`/api/users/current`)
    .then(res => {
      dispatch({
        type: profileTypes.FETCH_CURRENT_USER_SUCCESS,
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
    dispatch({ type: profileTypes.FETCH_USER_PENDING })
    api.get(`/api/users/${username}`)
      .then(res => {
        dispatch({
          type: profileTypes.FETCH_ANOTHER_USER_SUCCESS,
          payload: res
        })
        return res
      })
  }

export const fetchAnotherUserAndFriends = (username) => dispatch => {
  return Promise.all([dispatch(fetchAnotherUser(username)),
    dispatch(fetchAnotherUserFriends(username))])
}

export const fetchCurrentUserFriends = () => dispatch => {
  dispatch({ type: profileTypes.FETCH_USER_FRIENDS_PENDING })

  api.get(`/api/users/current/friends`)
    .then(res => {
      dispatch({
        type: profileTypes.FETCH_CURRENT_USER_FRIENDS_SUCCESS,
        payload: res
      })
      return res
    })
}

export const fetchAnotherUserFriends = (username) => dispatch => {
  dispatch({ type: profileTypes.FETCH_USER_FRIENDS_PENDING })

  api.get(`/api/users/${username}/friends`)
    .then(res => {
      dispatch({
        type: profileTypes.FETCH_ANOTHER_USER_FRIENDS_SUCCESS,
        payload: res
      })
      return res
    })
}