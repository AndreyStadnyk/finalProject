import React, {useEffect, useState} from 'react'
import './App.css'
import axios from 'axios'
import {Route, Switch} from "react-router-dom";
import Header from "./components/Header/Header";
import Tape from "./components/Tape/Tape";
import SignIn from "./components/sign-in";
import {Router} from "react-router-dom";

export default function App() {
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

            <Route exact path='/tape' component={Tape}/>


        </Switch>
    </div>

        )
    }
}

