import {actionTypes} from '../actions'

const initialState = {
  pending: true,
  friendsPending: false,
  currentUser: null,
  updateUserPage: false,
  resetPasswordStage: 0,
  anotherUser: null,
  currentUserFriends: null,
  anotherUserFriends: null
}

export default function usersReducer (state = initialState, action) {
  switch (action.type) {
    case actionTypes.FETCH_CURRENT_USER_PENDING:
      return {
        ...state,
        pending: true
      }
    case actionTypes.LOG_OUT_USER:
      return {
        ...state,
        currentUser: null
      }
    case actionTypes.FETCH_CURRENT_USER_SUCCESS:
      return {
        ...state,
        pending: false,
        currentUser: action.payload,
        resetPasswordStage: 0
      }

    case actionTypes.FETCH_ANOTHER_USER_PENDING:
      return {
        ...state,
        pending: true
      }
    case actionTypes.FETCH_ANOTHER_USER_SUCCESS:
      return {
        ...state,
        pending: false,
        anotherUser: action.payload
      }
    case actionTypes.UPDATE_USER_PAGE:
      return {
        ...state,
        updateUserPage: action.payload
      }

    case actionTypes.UPDATE_USER:
      return {
        ...state,
        updateUserPage: false,
        currentUser: action.payload
      }

    case actionTypes.RESET_PASSWORD_PENDING:
      return {
        ...state,
        resetPasswordStage: 1
      }

    case actionTypes.SEARCH_OTHER_USERS:
      return {
        ...state
      }

    case actionTypes.RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        resetPasswordStage: 2
      }

    case actionTypes.FETCH_CURRENT_USER_FRIENDS_PENDING:
      return {
        ...state,
        friendsPending: true
      }

    case actionTypes.FETCH_CURRENT_USER_FRIENDS_SUCCESS:
      return {
        ...state,
        friendsPending: false,
        currentUserFriends: state.currentUserFriends === null ? action.payload : state.currentUserFriends.concat(action.payload),
        pageNumber: action.pageNumber,
        totalPages: action.totalPages
      }

    case actionTypes.FETCH_ANOTHER_USER_FRIENDS_PENDING:
      return {
        ...state,
        friendsPending: true
      }

    case actionTypes.FETCH_ANOTHER_USER_FRIENDS_SUCCESS:
      return {
        ...state,
        friendsPending: false,
        anotherUserFriends: state.anotherUserFriends === null ? action.payload : state.anotherUserFriends.concat(action.payload),
        pageNumber: action.pageNumber,
        totalPages: action.totalPages
      }

    default:
      return state
  }
}
