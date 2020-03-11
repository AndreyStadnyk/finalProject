import React from 'react'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import ProfileTape from './ProfileTape'
import ProfileCard from './ProfileCard'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import TopMenu from '../TopMenu/top-menu'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  }

}))

function Profile2 () {
  const classes = useStyles()

  return (
    <MuiThemeProvider>
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TopMenu/>
          </Grid>
          <Grid item xs={12} sm={3}>
            <ProfileCard/>
          </Grid>
          <Grid item xs={12} sm={9}>
            <ProfileTape/>
          </Grid>

        </Grid>
      </div>
    </MuiThemeProvider>
  )
}

export default Profile2
