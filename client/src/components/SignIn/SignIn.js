import React, {useState} from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import {Redirect, NavLink} from 'react-router-dom'
import {logUser} from '../../actions/profileActions'
import {useDispatch, useSelector} from 'react-redux'

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
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}))

export default function SignIn () {
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const classes = useStyles()

  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.users.currentUser)
  const signIn = event => {
    event.preventDefault()

    const formData = new FormData()
    formData.append('username', username)
    formData.append('password', password)
    dispatch(logUser(formData))
  }
  if (currentUser) {
    return (
      <Redirect to="/profile" />
    )
  }
  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='username'
            label='Username'
            name='username'
            onChange={e => setUsername(e.target.value)}
            autoFocus
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            onChange={e => setPassword(e.target.value)}
            name='password'
            label='Password'
            type='password'
            id='password'
            autoComplete='current-password'
          />
          <FormControlLabel
            control={<Checkbox value='remember' color='primary' />}
            label='Remember me'
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            onClick={signIn}
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href='/reset-pass' variant='body2'>
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <NavLink to="/sign-up" href='' variant='body2'>
                {'Don\'t have an account? Sign Up'}
              </NavLink>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  )
}
