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
  }, [])

  if (!user) {
    return 'Loading...'
  }

  return (
    <div className='App'>
      <h2>Hello, {user.firstName} {user.lastName}</h2>
    </div>
  )
}

export default App
