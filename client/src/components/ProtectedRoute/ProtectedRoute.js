import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

import Profile2 from '../Profile/Profile2'
import Tape from '../Tape/Tape'
import NotFound from '../NotFound/NotFound'
import { useDispatch, useSelector } from 'react-redux'
import api from '../../helpers/FetchData'
import { profileTypes } from '../../actions/profileActions'

export default function ProtectedRouter (props) {
  const dispatch = useDispatch()
  const { currentUser } = useSelector(state => ({ currentUser: state.users.currentUser }))

  if (!currentUser) {
    api.get(`/api/users/current`)
      .then(response => {
        dispatch({
          type: profileTypes.SET_CURRENT_USER,
          payload: response
        })
      })
  }

  if (currentUser) {
    return (
      <Switch>
        <Route exact path='/profile' component={Profile2}/>
        <Route exact path='/tape' component={Tape}/>
        <Route exact path='/*' component={NotFound}/>
      </Switch>
    )
  } else {
    return <Redirect to='/sign-in'/>
  }
}
