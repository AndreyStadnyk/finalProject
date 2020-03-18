import React, {useEffect} from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import CircularProgress from '@material-ui/core/CircularProgress'
import Profile from '../Profile/Profile'
import Wall from '../Wall/Wall'
import NotFound from '../NotFound/NotFound'
import {useDispatch, useSelector} from 'react-redux'
import {fetchCurrentUser} from '../../actions/profileActions'

export default function ProtectedRouter () {
  const {currentUser, pending} = useSelector(state => ({
    currentUser: state.users.currentUser,
    pending: state.users.pending
  }))

  const dispatch = useDispatch()

  useEffect(() => {
    if (!currentUser) {
      dispatch(fetchCurrentUser())
    }
  }, [currentUser, dispatch])

  if (pending) {
    return <CircularProgress/>
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
