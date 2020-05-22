import api from '../helpers/FetchData'

export const postTypes = {
  FETCH_POSTS_PENDING: 'FETCH_POSTS_PENDING',
  FETCH_USER_POSTS_BY_AMOUNT: 'FETCH_USER_POSTS_BY_AMOUNT',
  FETCH_WALL_POSTS_BY_AMOUNT: 'FETCH_WALL_POSTS_BY_AMOUNT',
  FETCH_WALL_POSTS_SUCCESS: 'FETCH_WALL_POSTS_SUCCESS',
  FETCH_ANOTHER_USER_POSTS_BY_AMOUNT: 'FETCH_ANOTHER_USER_POSTS_BY_AMOUNT',
  UPDATE_POST_FOR_CURRENT_USER: 'UPDATE_POST_FOR_CURRENT_USER',
  UPDATE_POST_FOR_ANOTHER_USER: 'UPDATE_POST_FOR_ANOTHER_USER',
  POST_FOR_CURRENT_USER_DELETED: 'POST_FOR_CURRENT_USER_DELETED',
  POST_FOR_ANOTHER_USER_DELETED: 'POST_FOR_ANOTHER_USER_DELETED',
  POST_FOR_CURRENT_USER_CREATED: 'POST_FOR_CURRENT_USER_CREATED',
  POST_FOR_ANOTHER_USER_CREATED: 'POST_FOR_ANOTHER_USER_CREATED',
  UPDATE_COMMENT: 'UPDATE_COMMENT',
  COMMENT_DELETED: 'COMMENT_DELETED',
  COMMENT_CREATED: 'COMMENT_CREATED',
  SWITCH_LIKE: 'SWITCH_LIKE'
}

export const fetchUserPostsByAmount = (page) => dispatch => {
  dispatch({
    type: postTypes.FETCH_POSTS_PENDING
  })

  api.get(`/api/posts?page=${page}&sort=date,desc`)
    .then(res => {
      dispatch({
        type: postTypes.FETCH_USER_POSTS_BY_AMOUNT,
        payload: res.content,
        pageNumber: res.pageable.pageNumber,
        totalPages: res.totalPages
      })
    })
}

export const fetchAnotherUserPostsByAmount = (username, page) => dispatch => {
  dispatch({
    type: postTypes.FETCH_POSTS_PENDING
  })

  api.get(`/api/posts/${username}?page=${page}&sort=date,desc`)
    .then(res => {
      dispatch({
        type: postTypes.FETCH_ANOTHER_USER_POSTS_BY_AMOUNT,
        payload: res.content,
        pageNumber: res.pageable.pageNumber,
        totalPages: res.totalPages
      })
    })
}

export const fetchWallPostsByAmount = (page) => dispatch => {
  dispatch({
    type: postTypes.FETCH_POSTS_PENDING
  })

  api.get(`/api/posts/tape?page=${page}&sort=date,desc`)
    .then(res => {
      dispatch({
        type: postTypes.FETCH_WALL_POSTS_BY_AMOUNT,
        payload: res.content,
        pageNumber: res.pageable.pageNumber,
        totalPages: res.totalPages
      })
    })
}

export const postForCurrentUserCreated = (post) => {
  return dispatch => {
    dispatch({
      type: postTypes.POST_FOR_CURRENT_USER_CREATED,
      payload: post
    })
  }
}

export const postForAnotherUserCreated = (post) => {
  return dispatch => {
    dispatch({
      type: postTypes.POST_FOR_ANOTHER_USER_CREATED,
      payload: post
    })
  }
}

export const postForCurrentUserDeleted = (postId) => {
  return dispatch => {
    dispatch({
      type: postTypes.POST_FOR_CURRENT_USER_DELETED,
      payload: postId
    })
  }
}

export const postForAnotherUserDeleted = (postId) => {
  return dispatch => {
    dispatch({
      type: postTypes.POST_FOR_ANOTHER_USER_DELETED,
      payload: postId
    })
  }
}

export const addPostForCurrentUser = (post, ownerUsername) => {
  return dispatch => api.post(`/api/posts/${ownerUsername}`, post)
    .then(results => {
      dispatch(postForCurrentUserCreated(results))
    })
}

export const addPostForAnotherUser = (post, ownerUsername) => {
  return dispatch => api.post(`/api/posts/${ownerUsername}`, post)
    .then(results => {
      dispatch(postForAnotherUserCreated(results))
    })
}

export const deleteCurrentUserPost = (postId) => {
  return dispatch => api.deleteApi(`/api/posts/${postId}`)
    .then(results => {
      dispatch(postForCurrentUserDeleted(postId))
    })
}

export const deleteAnotherUserPost = (postId) => {
  return dispatch => api.deleteApi(`/api/posts/${postId}`)
    .then(results => {
      dispatch(postForAnotherUserDeleted(postId))
    })
}

export const updatePostForCurrentUser = (post) => {
  const data = {
    text: post.text
  }

  return dispatch => api.put(`/api/posts/${post.id}`, data)
    .then(dispatch({
      type: postTypes.UPDATE_POST_FOR_CURRENT_USER,
      payload: data
    }))
}

export const updatePostForAnotherUser = (post) => {
  const data = {
    text: post.text
  }

  return dispatch => api.put(`/api/posts/${post.id}`, data)
    .then(dispatch({
      type: postTypes.UPDATE_POST_FOR_ANOTHER_USER,
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