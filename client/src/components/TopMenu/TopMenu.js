import React from 'react'
import {fade} from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'
import {findUser, logOutUser} from '../../actions/profileActions'
import {useDispatch, useSelector} from 'react-redux'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'
import makeStyles from '@material-ui/core/styles/makeStyles'
import IconButton from '@material-ui/core/IconButton'
import {ExitToApp} from '@material-ui/icons'
import {useHistory} from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block'
    }
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto'
    }
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputRoot: {
    color: 'inherit'
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200
    }
  },
  pageLink: {
    margin: '0 20px'
  }
}))

export default function TopMenu () {
  const dispatch = useDispatch()

  const arrayOfUsers = useSelector(state => state.users.arrayOfUserSearch)
  const history = useHistory()

  const classes = useStyles()
  const logOut = () => {
    dispatch(logOutUser())
  }
  const [autocompleteInputValue, setAutocompleteInputValue] = React.useState('')

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
                        Awesome messenger!
          </Typography>
          <div className={classes.search}>
            <Autocomplete
              onChange={(e, v) => {
                setAutocompleteInputValue(`${v?.firstName} ${v?.lastName}` || '')
                history.push(`/profile/${v?.username}`)
                history.go(0)
                setAutocompleteInputValue(v?.username || '')
              }}
              options={arrayOfUsers}
              onOpen={async () => {

              }}
              id="combo-box-demo"
              getOptionLabel={(option) => {
                return `${option.firstName}  ${option.lastName}`
              }}
              classes={{root: 'autocomplete'}}
              style={{width: 300}}
              renderInput={(params) => {
                return (
                  <TextField {...params}
                    inputProps={{
                      ...params.inputProps,
                      onChange: async (e) => {
                        setAutocompleteInputValue(e.target.value)
                        dispatch(findUser(e.target.value))
                      },
                      value: autocompleteInputValue
                    }
                    }
                    variant="outlined"
                  />
                )
              }

              }
            />
          </div>
          <Typography className={classes.pageLink} variant="h6" noWrap>
            <Link href="/tape" color="inherit">
                            Tape
            </Link>
          </Typography>
          <Typography className={classes.pageLink} variant="h6" noWrap>
            <Link href="/profile" color="inherit">
                            Profile
            </Link>
          </Typography>
          <Typography className={classes.pageLink} variant="h6" noWrap>
            <Link href="/friends" color="inherit">
              Friends
            </Link>
          </Typography>
          <IconButton onClick={logOut} color="inherit">
            <ExitToApp/>
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  )
}
