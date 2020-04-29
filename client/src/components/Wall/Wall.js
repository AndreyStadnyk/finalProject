import React, {useEffect} from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { makeStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'
import Grid from '@material-ui/core/Grid'
import TopMenu from '../TopMenu/TopMenu'
import {useDispatch, useSelector} from 'react-redux'
import Tape from '../Tape/Tape'
import {fetchWallPosts} from '../../actions/postActions'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    maxWidth: 1200,
    margin: 'auto'
  },
  parent: {
    width: '100%',
    height: '100%',
    position: 'fixed',
    top: 0,
    left: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#ddd'
  }
}))

function Wall () {
  const classes = useStyles()
  const dispatch = useDispatch()

  const {
    pending,
    wallPosts
  } = useSelector(state => ({
    pending: state.posts.pending,
    wallPosts: state.posts.wallPosts
  }))

  useEffect(() => {
    if (wallPosts === null) {
      dispatch(fetchWallPosts())
    }
  }, [wallPosts, dispatch])

  if (pending) {
    return (
      <div className={classes.parent}>
        <CircularProgress size={100} />
      </div>
    )
  }

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
