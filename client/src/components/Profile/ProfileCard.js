import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import { useSelector } from 'react-redux'

const useStyles = makeStyles({
  root: {},
  media: {
    height: 300
  }
})
export default function ProfileCard () {
  const classes = useStyles()
  const {
    currentUser
  } = useSelector(state => ({
    currentUser: state.users.currentUser
  }))
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
            {currentUser.username}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {currentUser.address}
          </Typography>
        </CardContent>
      </CardActionArea>

      <CardActions>
      </CardActions>

    </Card>
  )
}