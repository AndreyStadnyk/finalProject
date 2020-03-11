import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { green } from '@material-ui/core/colors'
import { updateUser } from '../../actions/profileActions'
import { useDispatch, useSelector } from 'react-redux'
const useStyles = makeStyles({
  root: {},
  media: {
    height: 300
  }
})

export default function ProfileCard () {
  const dispatch = useDispatch()
  const classes = useStyles()
  const {
    currentUser,
    userPosts
  } = useSelector(state => ({
    currentUser: state.users.currentUser,
    userPosts: state.posts.userPosts
  }))
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="https://i.pravatar.cc/300"
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {currentUser.username}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {currentUser.address}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" onClick={() => dispatch(updateUser({
          username: 'PMatroskin',
          firstName: 'Petya',
          lastName: 'Matroskin',
          address: 'Wuhan',
          gender: 'male',
          password: '12345'
        }))}>
          Update user
        </Button>
        <Button size="small" color="secondary">
          Button
        </Button>
      </CardActions>
    </Card>
  )
}