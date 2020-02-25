import React, {useEffect, useState} from 'react'
import './App.css'
import axios from 'axios'

function App () {
  const [user, setUser] = useState(null)

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
            </Switch>
            <Header/>
            <div><Tape/></div>
        </div>
    )
  }

export default App
