import {actionTypes} from '../actions'

const initialState = {
  pending: false,
  userPosts: null,
  anotherUserPosts: null,
  wallPosts: null,
  pageNumber: 0
}

export default function postsReducer (state = initialState, action) {
  let currentPost
  let currentComment

  switch (action.type) {
    case actionTypes.FETCH_POSTS_PENDING:
      return {
        ...state,
        pending: true
      }

    case actionTypes.FETCH_USER_POSTS_SUCCESS:
      return {
        ...state,
        pending: false,
        userPosts: state.userPosts === null ? action.payload : state.userPosts.concat(action.payload),
        pageNumber: action.pageNumber,
        totalPages: action.totalPages
      }

    case actionTypes.FETCH_ANOTHER_USER_POSTS_SUCCESS:
      return {
        ...state,
        pending: false,
        anotherUserPosts: state.anotherUserPosts === null ? action.payload : state.anotherUserPosts.concat(action.payload),
        pageNumber: action.pageNumber,
        totalPages: action.totalPages
      }

    case actionTypes.FETCH_WALL_POSTS_SUCCESS:
      return {
        ...state,
        pending: false,
        wallPosts: state.wallPosts === null ? action.payload : state.wallPosts.concat(action.payload),
        pageNumber: action.pageNumber,
        totalPages: action.totalPages
      }

    case actionTypes.USER_POST_CREATED:
      return {
        ...state,
        userPosts: state.userPosts === null ? action.payload : state.userPosts.concat(action.payload).sort(
          function (a, b) {
            if (a.date < b.date) {
              return 1
            }
            if (a.date > b.date) {
              return -1
            }
            return 0
          }
        ) }

    case actionTypes.ANOTHER_USER_POST_CREATED:
      return {
        ...state,
        anotherUserPosts: state.anotherUserPosts === null ? action.payload : state.anotherUserPosts.concat(action.payload).sort(
          function (a, b) {
            if (a.date < b.date) {
              return 1
            }
            if (a.date > b.date) {
              return -1
            }
            return 0
          }
        ) }

    case actionTypes.USER_POST_DELETED:
      return {
        ...state,
        userPosts: state.userPosts = state.userPosts.filter(post => post.id !== action.payload)
      }

    case actionTypes.ANOTHER_USER_POST_DELETED:
      return {
        ...state,
        anotherUserPosts: state.anotherUserPosts = state.anotherUserPosts.filter(post => post.id !== action.payload)
      }

    case actionTypes.WALL_POST_DELETED:
      return {
        ...state,
        wallPosts: state.wallPosts = state.wallPosts.filter(post => post.id !== action.payload)
      }

    case actionTypes.UPDATE_USER_POST:
      currentPost = {...action.payload}
      return {
        userPosts: state.userPosts.map(post => post.id === currentPost.id ? currentPost : post)
      }

    case actionTypes.UPDATE_ANOTHER_USER_POST:
      currentPost = {...action.payload}
      return {
        anotherUserPosts: state.anotherUserPosts.map(post => post.id === currentPost.id ? currentPost : post)
      }

    case actionTypes.UPDATE_WALL_POST:
      currentPost = {...action.payload}
      return {
        wallPosts: state.wallPosts.map(post => post.id === currentPost.id ? currentPost : post)
      }

    case actionTypes.UPDATE_COMMENT_PROFILE:
      currentComment = {...action.payload}
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

    case actionTypes.UPDATE_COMMENT_ANOTHER_USER:
      currentComment = {...action.payload}
      return {
        anotherUserPosts: state.anotherUserPosts.map(post => {
          if (post.id === currentComment.postId) {
            currentPost = post
            currentPost.comments = currentPost.comments.map(c => c.id === currentComment.id ? currentComment : c)
            return currentPost
          } else {
            return post
          }
        })
      }

    case actionTypes.UPDATE_COMMENT_WALL:
      currentComment = {...action.payload}
      return {
        wallPosts: state.wallPosts.map(post => {
          if (post.id === currentComment.postId) {
            currentPost = post
            currentPost.comments = currentPost.comments.map(c => c.id === currentComment.id ? currentComment : c)
            return currentPost
          } else {
            return post
          }
        })
      }

    case actionTypes.COMMENT_CREATED_PROFILE:
      currentComment = action.payload
      return {
        ...state,
        userPosts: state.userPosts = state.userPosts.map(post => {
          if (post.id === currentComment.postId) {
            currentPost = post
            currentPost.comments = currentPost.comments.concat(action.payload)
            return currentPost
          } else {
            return post
          }
        })
      }

    case actionTypes.COMMENT_CREATED_ANOTHER_USER:
      currentComment = action.payload
      return {
        ...state,
        anotherUserPosts: state.anotherUserPosts = state.anotherUserPosts.map(post => {
          if (post.id === currentComment.postId) {
            currentPost = post
            currentPost.comments = currentPost.comments.concat(action.payload)
            return currentPost
          } else {
            return post
          }
        })
      }

    case actionTypes.COMMENT_CREATED_WALL:
      currentComment = action.payload
      return {
        ...state,
        wallPosts: state.wallPosts = state.wallPosts.map(post => {
          if (post.id === currentComment.postId) {
            currentPost = post
            currentPost.comments = currentPost.comments.concat(action.payload)
            return currentPost
          } else {
            return post
          }
        })
      }

    case actionTypes.COMMENT_DELETED_PROFILE:
      return {
        ...state,
        userPosts: state.userPosts = state.userPosts.map(post => {
          if (post.id === action.payload) {
            currentPost = post
            currentPost.comments = currentPost.comments.filter(comment => comment.id !== action.commentId)
            return currentPost
          } else {
            return post
          }
        })
      }

    case actionTypes.COMMENT_DELETED_ANOTHER_USER:
      return {
        ...state,
        anotherUserPosts: state.anotherUserPosts = state.anotherUserPosts.map(post => {
          if (post.id === action.payload) {
            currentPost = post
            currentPost.comments = currentPost.comments.filter(comment => comment.id !== action.commentId)
            return currentPost
          } else {
            return post
          }
        })
      }

    case actionTypes.COMMENT_DELETED_WALL:
      return {
        ...state,
        wallPosts: state.userPosts = state.wallPosts.map(post => {
          if (post.id === action.payload) {
            currentPost = post
            currentPost.comments = currentPost.comments.filter(comment => comment.id !== action.commentId)
            return currentPost
          } else {
            return post
          }
        })
      }

    case actionTypes.SWITCH_LIKE_PROFILE:
      return {
        userPosts: state.userPosts.map(post => post.id === action.payload.id ? action.payload : post)
      }

    case actionTypes.SWITCH_LIKE_ANOTHER_USER:
      return {
        anotherUserPosts: state.anotherUserPosts.map(post => post.id === action.payload.id ? action.payload : post)
      }

    case actionTypes.SWITCH_LIKE_WALL:
      return {
        wallPosts: state.wallPosts.map(post => post.id === action.payload.id ? action.payload : post)
      }

    default:
      return state
  }
}
