import React, { useEffect, useState } from 'react'
import './App.css'
import SignIn from './components/sign-in'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
// import axios from 'axios'

function App () {
  // const [user, setUser] = useState(null)
  //
  // useEffect(() => {
  //   axios('/api/v1/users/current')
  //     .then(response => {
  //       setUser(response.data)
  //     })
  // }, [])
  //
  // if (!user) {
  //   return 'Loading...'
  // }

  return (

    <Switch>
      <Route exact path='/sign-in' component={SignIn}/>
      {/*
      <Route exact path='/profile/:id' component={MyAccountPage} />
      */}
    </Switch>

  )
}

export default App
