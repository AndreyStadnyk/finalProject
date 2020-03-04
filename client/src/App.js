// import React, { useEffect, useState } from 'react'
import { Switch, Route } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import './App.css'
import Axios from 'axios'
import Tape from './components/Tape/Tape'
import SignIn from './components/SignIn/sign-in'
import Profile from './components/Profile/profile'

export default function App () {
  const [user, setUser] = useState(null)

  useEffect(() => {
    Axios('/api/v1/users/current')
      .then(response => {
        setUser(response.data)
      })
  }, [])

  if (!user) {
    return (
      <div>
        <Switch>
          <Route exact path='/sign-in' component={SignIn}/>
          <Route exact path='/profile' component={Profile}/>
          <Route exact path='/tape' component={Tape}/>
          <Route exact path='/*' component={SignIn}/>
        </Switch>
      </div>

    )
  }
}