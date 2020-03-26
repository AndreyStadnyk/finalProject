import {actionTypes} from '../actions'

const initialState = {
  pending: true,
  userPosts: null,
  wallPosts: null,
  totalElements: 0
}

export default function postsReducer (state = initialState, action) {
  let currentPost

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

    case actionTypes.FETCH_USER_POSTS_BY_AMOUNT:
      console.log(action.payload)
      return {
        ...state,
        pending: false,
        userPosts: action.payload,
        totalElements: action.payload.length
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
