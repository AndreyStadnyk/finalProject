import api from '../helpers/FetchData'

export const postTypes = {
  FETCH_USER_POSTS_PENDING: 'FETCH_USER_POSTS_PENDING',
  FETCH_USER_POSTS_SUCCESS: 'FETCH_USER_POSTS_SUCCESS',
  FETCH_USER_POSTS_BY_AMOUNT: 'FETCH_USER_POSTS_BY_AMOUNT',
  FETCH_WALL_POSTS_PENDING: 'FETCH_WALL_POSTS_PENDING',
  FETCH_WALL_POSTS_SUCCESS: 'FETCH_WALL_POSTS_SUCCESS',
  UPDATE_POST: 'UPDATE_POST',
  SWITCH_LIKE: 'SWITCH_LIKE'
}

export const fetchUserPosts = () => dispatch => {
  dispatch({
    type: postTypes.FETCH_USER_POSTS_PENDING
  })

  api.get(`/api/posts`)
    .then(res => {
      dispatch({
        type: postTypes.FETCH_USER_POSTS_SUCCESS,
        payload: res
      })
      return res
    })
}

export const fetchUserPostsByAmount = (amount) => dispatch => {
  dispatch({
    type: postTypes.FETCH_USER_POSTS_PENDING
  })

  api.get(`/api/posts`)
    .then(res => {
      dispatch({
        type: postTypes.FETCH_USER_POSTS_BY_AMOUNT,
        payload: {
          userPosts: res.filter((item, index) => index <= amount - 1),
          totalElements: res.length,
          currentItems: amount
        }
      })
      console.log(res)
      return res.userPosts
    })
}

export const fetchWallPosts = () => dispatch => {
  dispatch({
    type: postTypes.FETCH_WALL_POSTS_PENDING
  })

  api.get(`/api/posts`)
    .then(res => {
      dispatch({
        type: postTypes.FETCH_WALL_POSTS_SUCCESS,
        payload: res
      })
      return res
    })
}

export function addPost (post, ownerUsername) {
  return dispatch => api.post(`/api/posts/${ownerUsername}`, post)
    .then(results => {
      api.get(`/api/posts`).then(results => {
        dispatch(fetchUserPosts())
      })
    })
}

export function deletePost (postId) {
  return dispatch => api.deleteApi(`/api/posts/${postId}`)
    .then(results => {
      api.get(`/api/posts`).then(results => {
        dispatch(fetchUserPosts())
      })
    })
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
