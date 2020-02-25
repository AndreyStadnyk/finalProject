import React, {useEffect, useState} from 'react'
import './App.css'
import axios from 'axios'
import Header from "./components/Header/Header";
import Tape from "./components/Tape/Tape";

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
            <Header/>
            <div><Tape/></div>
        </div>
    )
  }


}

export default App
