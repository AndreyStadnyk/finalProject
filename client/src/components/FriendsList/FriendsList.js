import React, { useEffect } from 'react'
import InfiniteList from '../InfiniteList/InfiniteList'
import { useDispatch, useSelector } from 'react-redux'
import CircularProgress from '@material-ui/core/CircularProgress'
import { makeStyles } from '@material-ui/core/styles'
import {
  fetchAnotherUserAndFriends,
  fetchAnotherUserFriends,
  fetchCurrentUserFriends
} from '../../actions/profileActions'
import User from '../User/User'
import TopMenu from '../TopMenu/TopMenu'
import { useParams } from 'react-router-dom'

const useStyles = makeStyles({
  parent: {
    width: '100%',
    height: '100%',
    position: 'fixed',
    top: 0,
    left: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#ddd'
  }
})

export default function FriendsList () {
  const classes = useStyles()
  const dispatch = useDispatch()
  const user = useParams()
  const isUserCurrent = Object.keys(user).length === 0 && user.constructor === Object

  const {
    pending,
    anotherUser,
    currentUserFriends,
    anotherUserFriends
  } = useSelector(state => ({
    pending: state.users.pending,
    anotherUser: state.users.anotherUser,
    currentUserFriends: state.users.currentUserFriends,
    anotherUserFriends: state.users.anotherUserFriends
  }))

  useEffect(() => {
    if (currentUserFriends === null) {
      if (isUserCurrent && !pending) {
        dispatch(fetchCurrentUserFriends(0))
      } else if (!pending && anotherUserFriends === null) {
        dispatch(fetchAnotherUserAndFriends(user.username))
      }
    }
  }, [anotherUserFriends, currentUserFriends, dispatch, isUserCurrent, pending, user.username])

  if (pending && currentUserFriends === null) {
    return (
      <div className={classes.parent}>
        <CircularProgress size={100}/>
      </div>
    )
  }

  return (
    <div>
      <TopMenu/>
      <InfiniteList
        elements={isUserCurrent ? currentUserFriends : anotherUserFriends}
        element={User}
        fetchHandler={isUserCurrent ? fetchCurrentUserFriends : fetchAnotherUserFriends(anotherUser)}
        isUserCurrent={isUserCurrent}
      />
    </div>

  )
}
