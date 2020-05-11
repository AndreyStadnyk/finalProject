import React, {useState} from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import { changePassword, resetPassword } from '../../actions/profileActions'
import {useDispatch, useSelector} from 'react-redux'
import Redirect from 'react-router-dom/es/Redirect'
import CircularProgress from '@material-ui/core/CircularProgress'

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
}))

export default function ResetPassword () {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const classes = useStyles()
  const dispatch = useDispatch()
  const {
    pending,
    currentUser,
    resetPasswordStage
  } = useSelector(state => ({
    pending: state.users.pending,
    currentUser: state.users.currentUser,
    resetPasswordStage: state.users.resetPasswordStage
  }))

  if (currentUser) {
    return (
      <Redirect to="/profile"/>
    )
  }

  if ((pending && resetPasswordStage === 4) || resetPasswordStage === 1 || resetPasswordStage === 3) {
    return (
      <div className={classes.parent}>
        <CircularProgress size={100}/>
      </div>
    )
  }

  const onResetPassword = event => {
    event.preventDefault()
    dispatch(resetPassword(email))
  }

  const onChangePassword = event => {
    event.preventDefault()
    dispatch(changePassword(password))
  }

  let stageComponent
  if (resetPasswordStage === 0) {
    stageComponent = (
      <form className={classes.form} noValidate>
        <Typography component='h1' variant='h5'>
          Reset Password
        </Typography>
        <TextField
          variant='outlined'
          margin='normal'
          required
          fullWidth
          id='email'
          label='Email'
          name='email'
          onChange={e => setEmail(e.target.value)}
          autoFocus
        />
        <Button
          type='submit'
          fullWidth
          variant='contained'
          color='primary'
          onClick={onResetPassword}
          className={classes.submit}
        >
          Reset Password
        </Button>
      </form>
    )
  } else if (resetPasswordStage === 2) {
    stageComponent = (
      <form className={classes.form} noValidate>
        <Typography component='h1' variant='h5'>
          Change Password
        </Typography>
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
        <TextField
          variant='outlined'
          margin='normal'
          required
          fullWidth
          onChange={e => setPassword(e.target.value)}
          name='confirmPassword'
          label='Confirm Password'
          type='password'
          id='confirmPassword'
          autoComplete='current-password'
        />
        <Button
          type='submit'
          fullWidth
          variant='contained'
          color='primary'
          onClick={onChangePassword}
          className={classes.submit}
        >
          Change Password
        </Button>
      </form>
    )
  }

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        {stageComponent}
      </div>
    </Container>
  )
}
