import {actionTypes} from '../actions'

const initialState = {
  pending: true,
  currentUser: null,
  updateUserPage: false
}

export default function usersReducer (state = initialState, action) {
  switch (action.type) {
    case actionTypes.FETCH_USER_PENDING:
      return {
        ...state,
        pending: true
      }
    case actionTypes.FETCH_USER_SUCCESS:
      return {
        ...state,
        pending: false,
        currentUser: action.payload
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

    default:
      return state
  }
}
