import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import CssBaseline from '@material-ui/core/CssBaseline'
import Grid from '@material-ui/core/Grid'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import {makeStyles} from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import {NavLink} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {createUser} from '../../actions/profileActions'
import Redirect from 'react-router-dom/es/Redirect'
import ProfileForm from '../Profile/ProfileForm'

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  }
}))

export default function SignUp () {
  const classes = useStyles()

  const currentUser = useSelector(state => state.users.currentUser)
  if (currentUser) {
    return (
      <Redirect to="/profile"/>
    )
  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline/>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon/>
        </Avatar>
        <Typography component="h1" variant="h5">
           Sign up
        </Typography>
        <ProfileForm userAction={createUser} buttonLabel="Sign Up"/>
        <Grid container justify="flex-end">
          <Grid item>
            <NavLink to="/sign-in" href="#" variant="body2">
              Already have an account? Sign in
            </NavLink>
          </Grid>
        </Grid>
      </div>
    </Container>
  )
}