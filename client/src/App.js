// import React, { useEffect, useState } from 'react'
import React from 'react'
import { Switch, Route } from 'react-router-dom'
import React, {useEffect, useState} from 'react'
import './App.css'
import axios from 'axios'
import {Route, Switch} from "react-router-dom";
import Tape from "./components/Tape/Tape";
import SignIn from "./components/sign-in";
import SignIn from './components/sign-in'
import Profile from './components/profile'
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
      <Route exact path='/profile' component={Profile}/>
      //Эта замыкающая, все оставшиеся маршруты, кроме указанных
      <Route exact path='/*' component={SignIn}/>
    </Switch>
    useEffect(() => {
        axios('/api/v1/users/current')
            .then(response => {
                setUser(response.data)
            })
    }, []);

    if (!user) {
        return (
    <div>
        <Switch>
            <Route exact path='/sign-in' component={SignIn}/>

            <Route exact path='/tape' component={Tape}/>


        </Switch>
    </div>

        )
    }
}

