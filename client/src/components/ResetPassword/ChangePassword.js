import React, {useState} from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import { changePassword } from '../../actions/profileActions'
import {useDispatch, useSelector} from 'react-redux'
import Redirect from 'react-router-dom/es/Redirect'
import queryString from 'query-string'
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

export default function ChangePassword (props) {
  const [pass1, setPass1] = useState('')
  const [pass2, setPass2] = useState('')
  const classes = useStyles()
  const dispatch = useDispatch()
  const params = queryString.parse(props.location.search)
  console.log(params.token)
  const {
    resetPasswordStage
  } = useSelector(state => ({
    resetPasswordStage: state.users.resetPasswordStage
  }))

  if (resetPasswordStage === 1) {
    return (
      <div className={classes.parent}>
        <CircularProgress size={100}/>
      </div>
    )
  } else if (resetPasswordStage === 2) {
    return (
      <Redirect to="/sign-in"/>
    )
  }

  const onChangePassword = event => {
    event.preventDefault()
    if (params && params.token) {
      dispatch(changePassword(params.username, params.token, pass1, pass2))
    }
  }

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <form className={classes.form} noValidate>
          <Typography component='h1' variant='h5'>
            Change Password
          </Typography>
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            onChange={e => setPass1(e.target.value)}
            name='pass1'
            label='Password'
            type='password'
            id='pass1'
            autoComplete='current-password'
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            onChange={e => setPass2(e.target.value)}
            name='pass2'
            label='Confirm Password'
            type='password'
            id='pass2'
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
      </div>
    </Container>
  )
}
