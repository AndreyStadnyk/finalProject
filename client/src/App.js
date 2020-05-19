import {Switch, Route} from 'react-router-dom'
import React from 'react'
import './App.css'
import SignIn from './components/SignIn/SignIn'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import SignUp from './components/SignUp/SignUp'
import ResetPassword from './components/ResetPassword/ResetPassword'
import ChangePassword from './components/ResetPassword/ChangePassword'

export default function App () {
  return (
    <div>
      <Switch>
        <Route exact path='/sign-up' component={SignUp}/>
        <Route exact path='/sign-in' component={SignIn}/>
        <Route exact path='/reset-pass' component={ResetPassword}/>
        <Route exact path='/change-pass' component={ChangePassword}/>
        <Route exact path='/*' component={ProtectedRoute}/>
      </Switch>
    </div>
  )
}