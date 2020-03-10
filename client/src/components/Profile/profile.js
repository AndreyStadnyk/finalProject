
import TopMenu from '../TopMenu/top-menu'
import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import { connect } from 'react-redux'
import Post from '../Post/Post'
import { updateUser } from '../../actions/profileActions'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary
  }
}))

function Profile (props) {
  const classes = useStyles()
  const {
    dispatch,
    currentUser,
    userPosts
  } = props

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TopMenu/>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper className={classes.paper}>
            <p>username: {currentUser.username}<br/>
              firstName: {currentUser.firstName}<br/>
              lastName: {currentUser.lastName}<br/>
              address: {currentUser.address}<br/>
              gender: {currentUser.gender}<br/></p>
            <Button onClick={() => dispatch(updateUser({
              username: 'PMatroskin',
              firstName: 'Petya',
              lastName: 'Matroskin',
              address: 'Wuhan',
              gender: 'male',
              password: '12345'
            }))}>
              Update user
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={8}>
          <Paper className={classes.paper}>

            {userPosts.sort((a, b) => a.date - b.date).map(post => (
              <Post
                post = { post }
              />
            ))}

          </Paper>
        </Grid>

      </Grid>
    </div>
  )
}

function mapStateToProps (state) {
  return {
    currentUser: state.users.currentUser,
    userPosts: state.posts.userPosts
  }
}

export default connect(mapStateToProps)(Profile)
