import api from '../helpers/FetchData'

export const postTypes = {
  FETCH_USER_POSTS_PENDING: 'FETCH_USER_POSTS_PENDING',
  FETCH_USER_POSTS_SUCCESS: 'FETCH_USER_POSTS_SUCCESS',
  FETCH_USER_POSTS_BY_AMOUNT: 'FETCH_USER_POSTS_BY_AMOUNT',
  FETCH_WALL_POSTS_PENDING: 'FETCH_WALL_POSTS_PENDING',
  FETCH_WALL_POSTS_SUCCESS: 'FETCH_WALL_POSTS_SUCCESS',
  UPDATE_POST: 'UPDATE_POST',
  POST_DELETED: 'POST_DELETED',
  POST_CREATED: 'POST_CREATED',
  UPDATE_COMMENT: 'UPDATE_COMMENT',
  COMMENT_DELETED: 'COMMENT_DELETED',
  COMMENT_CREATED: 'COMMENT_CREATED',
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

export const fetchUserPostsByAmount = (page) => dispatch => {
  dispatch({
    type: postTypes.FETCH_USER_POSTS_PENDING
  })

  api.get(`/api/posts?page=${page}`)
    .then(res => {
      dispatch({
        type: postTypes.FETCH_USER_POSTS_BY_AMOUNT,
        payload: res.content,
        pageNumber: res.pageable.pageNumber,
        totalPages: res.totalPages
      })
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

export const postCreated = (post) => {
  return dispatch => {
    dispatch({
      type: postTypes.POST_CREATED,
      payload: post
    })
  }
}

export const postDeleted = (postId) => {
  return dispatch => {
    dispatch({
      type: postTypes.POST_DELETED,
      payload: postId
    })
  }
}

export const addPost = (post, ownerUsername) => {
  return dispatch => api.post(`/api/posts/${ownerUsername}`, post)
    .then(results => {
      dispatch(postCreated(results))
    })
}

export const deletePost = (postId) => {
  return dispatch => api.deleteApi(`/api/posts/${postId}`)
    .then(results => {
      dispatch(postDeleted(postId))
    })
}

export const updatePost = (post) => {
  const data = {
    text: post.text
  }

  return dispatch => api.put(`/api/posts/${post.id}`, data)
    .then(dispatch({
      type: postTypes.UPDATE_POST,
      payload: data
    }))
}

export const commentCreated = (comment) => {
  return dispatch => {
    dispatch({
      type: postTypes.COMMENT_CREATED,
      payload: comment
    })
  }
}

export const commentDeleted = (commentId, postId) => {
  return dispatch => {
    dispatch({
      type: postTypes.COMMENT_DELETED,
      payload: postId,
      commentId: commentId
    })
  }
}

export const addComment = (comment) => {
  const data = {
    text: comment.text
  }

  return dispatch => api.post(`/api/comments/${comment.postId}`, data)
    .then(results => {
      dispatch(commentCreated(results))
    })
}

export const deleteComment = (commentId, postId) => {
  return dispatch => api.deleteApi(`/api/comments/${commentId}`)
    .then(results => {
      dispatch(commentDeleted(commentId, postId))
    })
}

export const updateComment = (comment) => {
  const data = {
    text: comment.text
  }
  return dispatch => api.put(`/api/comments/${comment.id}`, data)
    .then(dispatch({
      type: postTypes.UPDATE_COMMENT,
      payload: comment
    }))
}

export const updateLike = (postId) => {
  return dispatch =>
    api.post(`/api/posts/${postId}/likes`)
      .then(results => {
        dispatch({ type: postTypes.SWITCH_LIKE })
      })
}