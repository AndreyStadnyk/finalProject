import {actionTypes} from '../actions'

const initialState = {
  currentUser: {
    username: 'VPupkin',
    firstName: 'Vasya',
    lastName: 'Pupkin',
    address: 'New York',
    gender: 'male',
    password: 'qwerty'
  }
}

export default function postsReducer (state = initialState, action) {
  switch (action.type) {
    case actionTypes.UPDATE_USER:
      return {
        currentUser: action.payload
      }

    default:
      return state
  }
}
