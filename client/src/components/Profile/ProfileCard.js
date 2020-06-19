import React, { useEffect } from 'react'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import {useDispatch, useSelector} from 'react-redux'
import Button from '@material-ui/core/Button'
import {changeProfilePhoto, getUserPhoto, profileTypes} from '../../actions/profileActions'
import makeStyles from '@material-ui/core/styles/makeStyles'

const useStyles = makeStyles({
  root: {},
  media: {
    height: 280
  }
})
export default function ProfileCard (props) {
  const classes = useStyles()
  const dispatch = useDispatch()
  const anotherUsername = props.anotherUser ? props.anotherUser : {}
  const isPhotoChanged = useSelector(state => state.users.photoChanged)
  const username = useSelector(state => state.users.currentUser.username)
  const photo = useSelector(state => state.users.returnedPhotoForProfile)

  useEffect(() => {
    if (photo === null && username) {
      dispatch(getUserPhoto(props.username || username))
    }
  })

  const photoSelectHandler = (e) => {
    const file = e.target.files[0]
    const formDataForPhoto = new FormData()
    formDataForPhoto.append('file', file)
    dispatch(changeProfilePhoto(formDataForPhoto))
    if (isPhotoChanged) {
      dispatch(getUserPhoto(username))
    }
  }

  const {
    currentUser,
    anotherUser,
    updateUserPage
  } = useSelector(state => ({
    currentUser: state.users.currentUser,
    anotherUser: state.users.anotherUser,
    updateUserPage: state.users.updateUserPage
  }))

  const isCurrentUser = Object.keys(anotherUsername).length === 0

  let buttonLabel
  if (updateUserPage) {
    buttonLabel = 'Cancel edit profile'
  } else {
    buttonLabel = 'Edit profile'
  }

  const editButton = isCurrentUser
    ? <Button
      type="submit"
      fullWidth
      variant="contained"
      color="primary"
      onClick={() => dispatch({type: profileTypes.UPDATE_USER_PAGE, payload: !updateUserPage})}
    >
      {buttonLabel}
    </Button> : null

  return (
    <Card variant='outlined' className={classes.root}>
      <CardActionArea onClick={() => document.getElementById('upload-photo').click()}>
        <img
          src={photo ? 'http://procmain.eu/storage/images/' + photo : './profile.png'}
          alt=""
          className={classes.media}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {isCurrentUser ? currentUser.username : anotherUser.username}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            First name: <strong>{isCurrentUser ? currentUser.firstName : anotherUsername.firstName}</strong>
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Last name: <strong>{isCurrentUser ? currentUser.lastName : anotherUser.lastName}</strong>
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Email: <strong>{isCurrentUser ? currentUser.email : anotherUser.email}</strong>
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Address: <strong>{isCurrentUser ? currentUser.address : anotherUser.address}</strong>
          </Typography>
          <input
            style={{ display: 'none' }}
            id="upload-photo"
            name="upload-photo"
            type="file"
            onChange={photoSelectHandler}
          />
        </CardContent>
      </CardActionArea>
      <CardActions>
        {editButton}
      </CardActions>
    </Card>
  )
}