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
    case actionTypes.FETCH_USER_POSTS_PENDING:
      return {
        ...state,
        pending: true
      }

    case actionTypes.FETCH_USER_POSTS_BY_AMOUNT_PENDING:
      return {
        ...state,
        pending: true
      }

    case actionTypes.FETCH_USER_POSTS_BY_AMOUNT:
      return {
        ...state,
        pending: false,
        userPosts: state.userPosts === null ? action.payload : state.userPosts.concat(action.payload),
        pageNumber: action.pageNumber,
        totalPages: action.totalPages
      }

    case actionTypes.FETCH_ANOTHER_USER_POSTS_BY_AMOUNT:
      return {
        ...state,
        pending: false,
        anotherUserPosts: state.anotherUserPosts === null ? action.payload : state.anotherUserPosts.concat(action.payload),
        pageNumber: action.pageNumber,
        totalPages: action.totalPages
      }

    case actionTypes.FETCH_WALL_POSTS_PENDING:
      return {
        ...state,
        pending: true
      }

    case actionTypes.FETCH_WALL_POSTS_BY_AMOUNT:
      return {
        ...state,
        pending: false,
        wallPosts: state.wallPosts === null ? action.payload : state.wallPosts.concat(action.payload),
        pageNumber: action.pageNumber,
        totalPages: action.totalPages
      }

    case actionTypes.POST_FOR_CURRENT_USER_CREATED:
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

    case actionTypes.POST_FOR_ANOTHER_USER_CREATED:
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

    case actionTypes.POST_FOR_CURRENT_USER_DELETED:
      return {
        ...state,
        userPosts: state.userPosts = state.userPosts.filter(post => post.id !== action.payload)
      }

    case actionTypes.POST_FOR_ANOTHER_USER_DELETED:
      return {
        ...state,
        anotherUserPosts: state.anotherUserPosts = state.anotherUserPosts.filter(post => post.id !== action.payload)
      }

    case actionTypes.UPDATE_POST_FOR_CURRENT_USER:
      currentPost = {...action.payload}
      return {
        userPosts: state.userPosts.map(post => post.id === currentPost.id ? currentPost : post)
      }

    case actionTypes.UPDATE_POST_FOR_ANOTHER_USER:
      currentPost = {...action.payload}
      return {
        anotherUserPosts: state.anotherUserPosts.map(post => post.id === currentPost.id ? currentPost : post)
      }

    case actionTypes.UPDATE_COMMENT:
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

    case actionTypes.COMMENT_CREATED:
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

    case actionTypes.COMMENT_DELETED:
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

    case actionTypes.SWITCH_LIKE:
      currentPost = {...action.payload}
      currentPost.likes++
      return {
        userPosts: state.userPosts.map(post => post.id === currentPost.id ? currentPost : post)
      }

    default:
      return state
  }
}