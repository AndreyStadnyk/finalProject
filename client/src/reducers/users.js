import {actionTypes} from '../actions'

const initialState = {
    pending: true,
    currentUser: null,
    updateUserPage: false,
    resetPasswordStage: 0,
    anotherUser: null,
    photoChanged: false
}

export default function usersReducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.FETCH_USER_PENDING:
            return {
                ...state,
                pending: true
            }
        case actionTypes.GET_PROFILE_PHOTO:
            return {
                ...state,
            }
        case actionTypes.LOG_OUT_USER:
            return {
                ...state,
            }
        case actionTypes.PROFILE_PHOTO_CHANGE:
            return {
                ...state,
                photoChanged: true
            }
        case actionTypes.FETCH_USER_SUCCESS:
            return {
                ...state,
                pending: false,
                currentUser: action.payload,
                resetPasswordStage: 0
            }

        case actionTypes.FETCH_ANOTHER_USER:
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

        default:
            return state
    }
}
