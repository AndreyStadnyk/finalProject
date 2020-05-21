import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import ProfileCard from './ProfileCard'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import TopMenu from '../TopMenu/TopMenu'
import { useDispatch, useSelector } from 'react-redux'
import {fetchAnotherUser, updateUser} from '../../actions/profileActions'
import ProfileForm from './ProfileForm'
import Button from '@material-ui/core/Button'
import PostAddIcon from '@material-ui/icons/PostAdd'
import InfiniteList from '../InfiniteScroll/InfiniteList'
import {fetchAnotherUserPostsByAmount, fetchUserPostsByAmount} from '../../actions/postActions'
import CircularProgress from '@material-ui/core/CircularProgress'
import ModalWindow from '../ModalPost/ModalPost'

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    maxWidth: 1200,
    margin: 'auto'
  },
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

function Profile () {
  const classes = useStyles()
  const [modalActive, setActive] = useState(false)
  const dispatch = useDispatch()
  const user = useParams()
  let isUserCurrent = Object.keys(user).length === 0 && user.constructor === Object
  
  const {
    pending,
    userPosts,
    anotherUserPosts,
    currentUser,
    anotherUser,
    updateUserPage
  } = useSelector(state => ({
    pending: state.posts.pending,
    userPosts: state.posts.userPosts,
    anotherUserPosts: state.posts.anotherUserPosts,
    currentUser: state.users.currentUser,
    anotherUser: state.users.anotherUser,
    updateUserPage: state.users.updateUserPage
  }))

  useEffect(() => {
    if (userPosts === null) {
      if (isUserCurrent && !pending) {
        dispatch(fetchUserPostsByAmount(0))
      } else if (!pending && anotherUserPosts === null) {
        dispatch(fetchAnotherUser(user.username))
        dispatch(fetchAnotherUserPostsByAmount(user.username, 0))
      }
    }
  }, [userPosts, dispatch, user, anotherUser, pending, anotherUserPosts, isUserCurrent])

  const toggleModal = () => {
    setActive(true)
  }

  if (pending && userPosts === null && anotherUserPosts === null) {
    return (
      <div className={classes.parent}>
        <CircularProgress size={100}/>
      </div>
    )
  }
  const modal = modalActive
    ? <ModalWindow modalActive={modalActive} setActive={setActive}/> : null

  let profileContent
  if (updateUserPage) {
    profileContent = (
      <ProfileForm userAction={updateUser} buttonLabel="Update" currentUser={currentUser}/>
    )
  } else {
    profileContent = (
      <div>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          className={classes.button}
          startIcon={<PostAddIcon/>}
          onClick={toggleModal}
        >
          Add post
        </Button>
        <InfiniteList
          elements={isUserCurrent ? userPosts : anotherUserPosts}
          fetchHandler={fetchUserPostsByAmount}
        />
      </div>
    )
  }

  return (
    <MuiThemeProvider>
      {modal}
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TopMenu/>
          </Grid>
          <Grid item xs={12} sm={3}>
            <ProfileCard anotherUser ={anotherUser}/>
          </Grid>
          <Grid item xs={12} sm={9}>
            {profileContent}
          </Grid>
        </Grid>
      </div>
    </MuiThemeProvider>
  )
}

export default Profile
