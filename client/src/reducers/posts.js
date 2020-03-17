import {actionTypes} from '../actions'

const initialState = {
  userPosts: [
    {
      id: 1,
      date: new Date(),
      text: 'My first post',
      likes: 2
    },
    {
      id: 2,
      date: new Date(),
      text: 'My second post',
      likes: 5
    }
  ],
  wallPosts: [
    {
      id: 1,
      date: new Date(),
      text: 'My first post',
      likes: 2
    },
    {
      id: 2,
      date: new Date(),
      text: 'My second post',
      likes: 5
    }
  ]
}

export default function postsReducer (state = initialState, action) {
  let currentPost

  switch (action.type) {
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
