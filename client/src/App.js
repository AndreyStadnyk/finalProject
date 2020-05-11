import {Switch, Route} from 'react-router-dom'
import React from 'react'
import './App.css'
import SignIn from './components/SignIn/sign-in'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import Register from './components/Register/Register'

export default function App () {
  return (
    <div>
      <Switch>
        <Route exact path='/sign-up' component={SignUp}/>
        <Route exact path='/sign-in' component={SignIn}/>
        <Route exact path='/*' component={ProtectedRoute}/>
      </Switch>
    </div>
  )
}