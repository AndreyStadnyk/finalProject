import React from 'react'
import { useForm } from 'react-hook-form'

import { useDispatch } from 'react-redux'
import { updateUser } from '../../actions/profileActions'

import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import SaveIcon from '@material-ui/icons/Save'
import Button from '@material-ui/core/Button'

export default function ProfileUpdate (props) {
  const useStyles = makeStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }
  })
  
  const { register, handleSubmit, watch, errors } = useForm()
  const onSubmit = data => { dispatch(updateUser(data)) }
  const dispatch = useDispatch()
  const classes = useStyles()

  console.log(watch('lastName')) // watch input value by passing the name of it

  return (
    <form className={classes.root} onSubmit={handleSubmit(onSubmit)}>
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
      {errors.username && <span>This field min length is 10 A-z</span>}
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
        id="gender"
        name='gender'
        label="Gender"
        defaultValue={props.currentUser.gender}
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
        inputRef={register}
        fullWidth
      />
      <Button
        variant="contained"
        color="primary"
        size="large"
        type="submit"
        className={classes.button}
        startIcon={<SaveIcon />}
      >
        Save
      </Button>

    </form>
  )
}
