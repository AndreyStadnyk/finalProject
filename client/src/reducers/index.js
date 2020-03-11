import {combineReducers} from 'redux'
import posts from './posts'
import users from './users'
import {reducer as toastrReducer} from 'react-redux-toastr'

export default combineReducers({
  posts,
  users,
  toastr: toastrReducer
})
