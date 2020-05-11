import React from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Navbar from '../TopMenu/TopMenu'

export default function ChatPage () {
  const useStyles = makeStyles(theme => ({
    leftPannelOfUsers: {
      width: '30%',
      backgroundColor: 'blue'
    },
    container: {
      display: 'flex'
    },
    rightPannelChat: {

    }

  }))
  const classes = useStyles()

  return (
    <div className={classes.container}>
      <Navbar/>
      <div>
        <div className={classes.leftPannelOfUsers}>

        </div>
        <div className={classes.rightPannelChat}>

        </div>
      </div>

    </div>
  )
}