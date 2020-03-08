import {actionTypes} from '../actions'

const initialState = {
  userPosts: [
    {
      date: new Date(),
      text: 'My first post'
    },
    {
      date: new Date(),
      text: 'My second post'
    }
  ]
}

export default function postsReducer (state = initialState, action) {
  switch (action.type) {
    case actionTypes.UPDATE_POST:
      return {
        userPosts: state.userPosts.map(() => action.payload)
      }

    default:
      return state
  }
}
