import React, {useEffect} from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress'
import Profile from '../Profile/Profile'
import Wall from '../Wall/Wall'
import NotFound from '../NotFound/NotFound'
import {useDispatch, useSelector} from 'react-redux'
import {fetchCurrentUser} from '../../actions/profileActions'

const useStyles = makeStyles(theme => ({
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

export default function ProtectedRouter () {
  const {currentUser, pending} = useSelector(state => ({
    currentUser: state.users.currentUser,
    pending: state.users.pending
  }))

  const dispatch = useDispatch()
  const classes = useStyles()

  useEffect(() => {
    if (currentUser === null) {
      dispatch(fetchCurrentUser())
    }
  }, [currentUser, dispatch])

  if (pending) {
    return (
      <div className={classes.parent}>
        <CircularProgress size={100} />
      </div>
    )
  }

  if (currentUser) {
    return (
      <Switch>
        <Route exact path='/profile' component={Profile}/>
        <Route exact path='/tape' component={Wall}/>
        <Route exact path='/*' component={NotFound}/>
      </Switch>
    )
  } else {
    return <Redirect to='/sign-in'/>
  }
}
