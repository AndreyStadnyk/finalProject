import {actionTypes} from '../actions'

const initialState = {
  pending: true,
  currentUser: null,
  updateUserPage: false,
  resetPasswordStage: 0
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
        currentUser: action.payload,
        resetPasswordStage: 0
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

    case actionTypes.RESET_PASSWORD_EMAIL_PENDING:
      return {
        ...state,
        resetPasswordStage: 1
      }

    case actionTypes.RESET_PASSWORD_EMAIL_SUCCESS:
      return {
        ...state,
        resetPasswordStage: 2
      }

    case actionTypes.RESET_PASSWORD_PENDING:
      return {
        ...state,
        resetPasswordStage: 3
      }

    case actionTypes.RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        resetPasswordStage: 4
      }

    default:
      return state
  }
}
