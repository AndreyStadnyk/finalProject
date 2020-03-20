import React from 'react'
import { useForm } from 'react-hook-form'

import { useDispatch } from 'react-redux'
import { updateUser } from '../../actions/profileActions'

import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import SaveIcon from '@material-ui/icons/Save'
import Button from '@material-ui/core/Button'
import Alert from '@material-ui/lab/Alert'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'

export default function ProfileUpdate (props) {
  const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },
    container: {
      display: 'grid',
      gridTemplateColumns: 'repeat(12, 1fr)',
      gridGap: theme.spacing(3)
    },
    paper: {
      padding: theme.spacing(1),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      whiteSpace: 'nowrap',
      marginBottom: theme.spacing(1),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },
    alert: {
      margin: theme.spacing(1)
    },
    grid: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }
  }))
  const { register, handleSubmit, watch, errors } = useForm()
  const onSubmit = data => { dispatch(updateUser(data)) }
  const dispatch = useDispatch()
  const classes = useStyles()

  console.log(watch('lastName')) // watch input value by passing the name of it

  return (
    <form className={classes.root} onSubmit={handleSubmit(onSubmit)}>
      <Paper className={classes.paper}>

        <Grid container spacing={3}>
          <Grid item xs={6} className={classes.grid}>
            <TextField
              id='firstName'
              name='firstName'
              label="First Name"
              defaultValue={props.currentUser.firstName}
              variant='outlined'
              margin='normal'
              inputRef={register}
              fullWidth
            />
            <TextField
              id="lastName"
              name='lastName'
              label="Last Name"
              defaultValue={props.currentUser.lastName}
              variant="outlined"
              margin='normal'
              inputRef={register}
              fullWidth
            />
            <TextField
              id="gender"
              name='gender'
              label="Gender"
              defaultValue={props.currentUser.gender}
              variant="outlined"
              margin='normal'
              inputRef={register}
              fullWidth
            />

          </Grid>
          <Grid item xs={6} className={classes.grid}>

            <TextField
              id='username'
              name='username'
              label="Username"
              defaultValue={props.currentUser.username}
              variant='outlined'
              margin='normal'
              inputRef={register({ required: true, minLength: 10, pattern: /^[A-Za-z]+$/i })}
              fullWidth
            />
            <TextField
              id="address"
              name='address'
              label="Address"
              defaultValue={props.currentUser.address}
              variant="outlined"
              margin='normal'
              inputRef={register}
              fullWidth
            />
            <TextField
              id="password"
              name='password'
              label="Password"
              defaultValue={props.currentUser.password}
              variant="outlined"
              margin='normal'
              inputRef={register({required: true})}
              fullWidth
            />
          </Grid>
        </Grid>
      </Paper>

      <Button
        variant="contained"
        color="primary"
        size="large"
        type="submit"
        margin='normal'
        className={classes.button}
        startIcon={<SaveIcon/>}
      >
        Save
      </Button>
      {errors.username &&
        <Alert variant='outlined' className={classes.alert} severity="error">Username must be min 8 A-z characters please!</Alert>}
      {errors.password &&
        <Alert variant='outlined'className={classes.alert} severity="error">Password field required!</Alert>}

    </form>
  )
}
