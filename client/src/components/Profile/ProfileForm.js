import React, {useState} from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import GenderSelect from '../GenderSelect/GenderSelect'
import {useDispatch} from 'react-redux'
import Alert from '@material-ui/lab/Alert'
import {useForm} from 'react-hook-form'
import makeStyles from '@material-ui/core/styles/makeStyles'

const useStyles = makeStyles(theme => ({
  selectContainer: {
    display: 'flex'
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}))

export default function ProfileForm (props) {
  const classes = useStyles()
  const currentUser = props.currentUser ? props.currentUser : {}

  const [firstName, setFirstName] = useState(currentUser.firstName)
  const [lastName, setLastName] = useState(currentUser.lastName)
  const [email, setEmail] = useState(currentUser.email)
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState(currentUser.username)
  const [address, setAddress] = useState(currentUser.address)
  const [birthDate, setBirthDate] = useState(currentUser.birthDate)
  const [gender, setGender] = useState(currentUser.gender)
  const dispatch = useDispatch()
  const {register, handleSubmit, errors} = useForm()
  const onSubmit = event => {
    const frmdetails = {firstName, lastName, email, password, username, address, birthDate, gender}
    const formData = new FormData()
    formData.append('username', username)
    formData.append('password', password)
    dispatch(props.userAction(frmdetails, formData))
  }

  return (
    <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            id="firstName"
            name="firstName"
            label="First Name"
            defaultValue={currentUser.firstName}
            inputRef={register}
            variant="outlined"
            required
            fullWidth
            autoComplete="fname"
            autoFocus
            onChange={e => setFirstName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="lastName"
            name="lastName"
            label="Last Name"
            defaultValue={currentUser.lastName}
            variant="outlined"
            required
            fullWidth
            autoComplete="lname"
            onChange={e => setLastName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="username"
            name="username"
            label="Username"
            defaultValue={currentUser.username}
            inputRef={register({required: true, minLength: 3, pattern: /^[A-Za-z]+$/i})}
            variant="outlined"
            required
            fullWidth
            autoComplete="current-password"
            onChange={e => setUsername(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="email"
            name="email"
            label="Email Address"
            defaultValue={currentUser.email}
            variant="outlined"
            required
            fullWidth
            autoComplete="email"
            onChange={e => setEmail(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="password"
            name="password"
            label="Password"
            defaultValue=""
            inputRef={register({required: true})}
            variant="outlined"
            required
            fullWidth
            type="password"
            autoComplete="current-password"
            onChange={e => setPassword(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="address"
            name="address"
            label="Address"
            defaultValue={currentUser.address}
            variant="outlined"
            fullWidth
            onChange={e => setAddress(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <div className={classes.selectContainer}>
            <form className={classes.container} noValidate>
              <TextField
                id="birthDate"
                label="Birthday"
                type="date"
                defaultValue={currentUser.birthDate}
                className={classes.textField}
                onChange={e => setBirthDate(e.target.value)}
                InputLabelProps={{
                  shrink: true
                }}
              />
            </form>
            <GenderSelect setGender={setGender} gender={currentUser.gender}/>
          </div>

        </Grid>
      </Grid>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
      >
        {props.buttonLabel}
      </Button>
      {errors.username &&
            <Alert variant='outlined' className={classes.alert} severity="error">Username must be min 3 A-z characters
                please!</Alert>}
      {errors.password &&
            <Alert variant='outlined' className={classes.alert} severity="error">Password field required!</Alert>}
    </form>
  )
}