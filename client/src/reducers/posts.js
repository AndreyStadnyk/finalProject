import {actionTypes} from '../actions'

const initialState = {
  pending: true,
  userPosts: null,
  wallPosts: null
}

export default function postsReducer (state = initialState, action) {
  let currentPost
  let currentComment

  switch (action.type) {
    case actionTypes.FETCH_USER_POSTS_PENDING:
      return {
        ...state,
        pending: true
      }

    case actionTypes.FETCH_USER_POSTS_SUCCESS:
      return {
        ...state,
        pending: false,
        userPosts: action.payload
      }

    case actionTypes.FETCH_WALL_POSTS_PENDING:
      return {
        ...state,
        pending: true
      }

    case actionTypes.FETCH_WALL_POSTS_SUCCESS:
      return {
        ...state,
        pending: false,
        wallPosts: action.payload
      }

    case actionTypes.UPDATE_POST:
      currentPost = { ...action.payload }
      return {
        userPosts: state.userPosts.map(post => post.id === currentPost.id ? currentPost : post)
      }

    case actionTypes.UPDATE_COMMENT:
      currentComment = { ...action.payload }
      return {
        userPosts: state.userPosts.map(post => {
          if (post.id === currentComment.postId) {
            currentPost = post
            currentPost.comments = currentPost.comments.map(c => c.id === currentComment.id ? currentComment : c)
            return currentPost
          } else {
            return post
          }
        })
      }

    case actionTypes.SWITCH_LIKE:
      currentPost = { ...action.payload }
      currentPost.likes++
      return {
        userPosts: state.userPosts.map(post => post.id === currentPost.id ? currentPost : post)
      }

    default:
      return state
  }
}
