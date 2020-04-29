import {actionTypes} from '../actions'

const initialState = {
  pending: true,
  currentUser: null,
  userRegistered: false,
  userLogged: false
}

export default function usersReducer (state = initialState, action) {
  switch (action.type) {
    case actionTypes.CREATE_USER:
      return {
        ...state,
        userRegistered: true
      }
    case actionTypes.LOG_USER:
      return {
        ...state,
        userLogged: true
      }

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
    case actionTypes.UPDATE_USER:
      return {
        ...state,
        currentUser: action.payload
      }

    default:
      return state
  }
}
