import React, {useEffect, useState} from 'react'
import './App.css'
import axios from 'axios'
import Switch from "@material-ui/core/Switch";
import { Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Tape from "./components/Tape/Tape";
import SignIn from "./components/sign-in";

export default function App () {
  const [user, setUser] = useState(null);

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
                <Route exact path='/home' component={Header}/>
                <Route exact path='/home1' component={Tape}/>



            </Switch>
        </div>
    )
  }}

