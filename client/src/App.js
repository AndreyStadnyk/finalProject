import React, {useEffect, useState} from 'react'
import './App.css'
import SignIn from './components/SignIn'
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
    <SignIn/>

  )
}

export default App
