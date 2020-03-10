import React from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'

const useStyles = makeStyles({
  container: {
    margin: '0px auto'
  }
})

function NotFound () {
  const classes = useStyles()
  return (
    <div className={classes.container}>
      <h3>404 page not found</h3>
      <p>We are sorry but the page you are looking for does not exist.</p>
      <h1>Congratulation's!</h1>
    </div>
  )
}

export default NotFound