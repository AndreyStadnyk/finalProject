import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import { useDispatch, useSelector } from 'react-redux'
import Button from '@material-ui/core/Button'
import { profileTypes } from '../../actions/profileActions'

const useStyles = makeStyles({
  root: {},
  media: {
    height: 300
  }
})
export default function ProfileCard (props) {
  const classes = useStyles()
  const dispatch = useDispatch()
  const anotherUsername = props.anotherUser ? props.anotherUser : {}

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
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="https://i.pravatar.cc/300"
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {isCurrentUser ? currentUser.username : anotherUser.username}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            First name: {isCurrentUser ? currentUser.firstName : anotherUsername.firstName}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Last name: {isCurrentUser ? currentUser.lastName : anotherUser.lastName}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Email: {isCurrentUser ? currentUser.email : anotherUser.email}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Address: {isCurrentUser ? currentUser.address : anotherUser.address}
          </Typography>
        </CardContent>
      </CardActionArea>

      <CardActions>
        {editButton}
      </CardActions>

    </Card>
  )
}