import api from '../helpers/FetchData'

export const postTypes = {
  FETCH_POSTS_PENDING: 'FETCH_POSTS_PENDING',
  FETCH_USER_POSTS_SUCCESS: 'FETCH_USER_POSTS_SUCCESS',
  FETCH_WALL_POSTS_SUCCESS: 'FETCH_WALL_POSTS_SUCCESS',
  FETCH_ANOTHER_USER_POSTS_SUCCESS: 'FETCH_ANOTHER_USER_POSTS_SUCCESS',
  UPDATE_USER_POST: 'UPDATE_USER_POST',
  UPDATE_ANOTHER_USER_POST: 'UPDATE_ANOTHER_USER_POST',
  UPDATE_WALL_POST: 'UPDATE_WALL_POST',
  USER_POST_DELETED: 'USER_POST_DELETED',
  ANOTHER_USER_POST_DELETED: 'ANOTHER_USER_POST_DELETED',
  WALL_POST_DELETED: 'WALL_POST_DELETED',
  USER_POST_CREATED: 'USER_POST_CREATED',
  ANOTHER_USER_POST_CREATED: 'ANOTHER_USER_POST_CREATED',
  UPDATE_COMMENT_PROFILE: 'UPDATE_COMMENT_PROFILE',
  UPDATE_COMMENT_ANOTHER_USER: 'UPDATE_COMMENT_ANOTHER_USER',
  UPDATE_COMMENT_WALL: 'UPDATE_COMMENT_WALL',
  COMMENT_DELETED_PROFILE: 'COMMENT_DELETED_PROFILE',
  COMMENT_DELETED_ANOTHER_USER: 'COMMENT_DELETED_ANOTHER_USER',
  COMMENT_DELETED_WALL: 'COMMENT_DELETED_WALL',
  COMMENT_CREATED_PROFILE: 'COMMENT_CREATED_PROFILE',
  COMMENT_CREATED_ANOTHER_USER: 'COMMENT_CREATED_ANOTHER_USER',
  COMMENT_CREATED_WALL: 'COMMENT_CREATED_WALL',
  SWITCH_LIKE_PROFILE: 'SWITCH_LIKE_PROFILE',
  SWITCH_LIKE_ANOTHER_USER: 'SWITCH_LIKE_ANOTHER_USER',
  SWITCH_LIKE_WALL: 'SWITCH_LIKE_WALL'
}

export const fetchCurrentUserPostsByAmount = (page) => dispatch => {
  dispatch({
    type: postTypes.FETCH_POSTS_PENDING
  })

  api.get(`/api/posts?page=${page}&sort=date,desc`)
    .then(res => {
      dispatch({
        type: postTypes.FETCH_USER_POSTS_SUCCESS,
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
        type: postTypes.FETCH_ANOTHER_USER_POSTS_SUCCESS,
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
        type: postTypes.FETCH_WALL_POSTS_SUCCESS,
        payload: res.content,
        pageNumber: res.pageable.pageNumber,
        totalPages: res.totalPages
      })
    })
}

export const postForCurrentUserCreated = (post) => {
  return dispatch => {
    dispatch({
      type: postTypes.USER_POST_CREATED,
      payload: post
    })
  }
}

export const postForAnotherUserCreated = (post) => {
  return dispatch => {
    dispatch({
      type: postTypes.ANOTHER_USER_POST_CREATED,
      payload: post
    })
  }
}

export const postForCurrentUserDeleted = (postId) => {
  return dispatch => {
    dispatch({
      type: postTypes.USER_POST_DELETED,
      payload: postId
    })
  }
}

export const postForAnotherUserDeleted = (postId) => {
  return dispatch => {
    dispatch({
      type: postTypes.ANOTHER_USER_POST_DELETED,
      payload: postId
    })
  }
}

export const wallPostDeleted = (postId) => {
  return dispatch => {
    dispatch({
      type: postTypes.WALL_POST_DELETED,
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

export const deleteCurrentUserPost = (postId, pageCode) => {
  return dispatch => api.deleteApi(`/api/posts/${postId}`)
    .then(results => {
      dispatch(pageCode === 0 ? postForCurrentUserDeleted(postId)
        : pageCode === 1 ? postForAnotherUserDeleted(postId) : wallPostDeleted(postId))
    })
}

export const deleteAnotherUserPost = (postId, pageCode) => {
  return dispatch => api.deleteApi(`/api/posts/${postId}`)
    .then(results => {
      dispatch(pageCode === 0 ? postForCurrentUserDeleted(postId)
        : pageCode === 1 ? postForAnotherUserDeleted(postId) : wallPostDeleted(postId))
    })
}

export const updatePostForCurrentUser = (post) => {
  const data = {
    text: post.text
  }

  return dispatch => api.put(`/api/posts/${post.id}`, data)
    .then(dispatch({
      type: postTypes.UPDATE_USER_POST,
      payload: data
    }))
}

export const updatePostForAnotherUser = (post) => {
  const data = {
    text: post.text
  }

  return dispatch => api.put(`/api/posts/${post.id}`, data)
    .then(dispatch({
      type: postTypes.UPDATE_ANOTHER_USER_POST,
      payload: data
    }))
}

export const updateWallPost = (post) => {
  const data = {
    text: post.text
  }

  return dispatch => api.put(`/api/posts/${post.id}`, data)
    .then(dispatch({
      type: postTypes.UPDATE_WALL_POST,
      payload: data
    }))
}

export const commentCreated = (comment, pageCode) => {
  return dispatch => {
    dispatch({
      type: pageCode === 0 ? postTypes.COMMENT_CREATED_PROFILE
        : pageCode === 1 ? postTypes.COMMENT_CREATED_ANOTHER_USER : postTypes.COMMENT_CREATED_WALL,
      payload: comment
    })
  }
}

export const commentDeleted = (commentId, postId, pageCode) => {
  return dispatch => {
    dispatch({
      type: pageCode === 0 ? postTypes.COMMENT_DELETED_PROFILE
        : pageCode === 1 ? postTypes.COMMENT_DELETED_ANOTHER_USER : postTypes.COMMENT_DELETED_WALL,
      payload: postId,
      commentId: commentId
    })
  }
}

export const addComment = (comment, pageCode) => {
  const data = {
    text: comment.text
  }

  return dispatch => api.post(`/api/comments/${comment.postId}`, data)
    .then(results => {
      dispatch(commentCreated(results, pageCode))
    })
}

export const deleteComment = (commentId, postId, pageCode) => {
  return dispatch => api.deleteApi(`/api/comments/${commentId}`)
    .then(results => {
      dispatch(commentDeleted(commentId, postId, pageCode))
    })
}

export const updateComment = (comment, pageCode) => {
  const data = {
    text: comment.text
  }
  return dispatch => api.put(`/api/comments/${comment.id}`, data)
    .then(dispatch({
      type: pageCode === 0 ? postTypes.UPDATE_COMMENT_PROFILE
        : pageCode === 1 ? postTypes.UPDATE_COMMENT_ANOTHER_USER : postTypes.UPDATE_COMMENT_WALL,
      payload: comment
    }))
}

export const updateLike = (postId, pageCode) => {
  return dispatch =>
    api.post(`/api/posts/${postId}/likes`)
      .then(results => {
        dispatch({
          type: pageCode === 0 ? postTypes.SWITCH_LIKE_PROFILE
            : pageCode === 1 ? postTypes.SWITCH_LIKE_ANOTHER_USER : postTypes.SWITCH_LIKE_WALL,
          payload: results
        })
      })
}
