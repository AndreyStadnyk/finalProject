import React from 'react'
import {fade, makeStyles} from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import InputBase from '@material-ui/core/InputBase'
import SearchIcon from '@material-ui/icons/Search'
import Link from '@material-ui/core/Link'
import Button from '@material-ui/core/Button'
import {findUser, logOutUser} from '../../actions/profileActions'
import {useDispatch} from 'react-redux'

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

  const classes = useStyles()
  const logOut = () => {
    dispatch(logOutUser())
  }
  const handleSearchChange = (event) => {
    dispatch(findUser(event.target.value))
  }

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
                        Awesome messenger!
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon/>
            </div>
            <InputBase
              onChange={handleSearchChange}
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput
              }}
              inputProps={{'aria-label': 'search'}}
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
          <Button onClick={logOut} color="inherit">
                            Log Out
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  )
}
