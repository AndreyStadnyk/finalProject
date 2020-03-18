import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import TopMenu from '../TopMenu/top-menu'
import { useSelector } from 'react-redux'
import Tape from '../Tape/Tape'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    maxWidth: 1200,
    margin: 'auto'

  }

}))

function Wall () {
  const classes = useStyles()

  const {
    wallPosts
  } = useSelector(state => ({
    wallPosts: state.posts.userPosts
  }))

  return (
    <MuiThemeProvider>
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TopMenu/>
          </Grid>
          <Grid item xs={12}>
            <Tape posts={wallPosts} />
          </Grid>
        </Grid>
      </div>
    </MuiThemeProvider>
  )
}

export default Wall
