import React, { useEffect } from 'react'
import InfiniteList from '../InfiniteScroll/InfiniteScroll'
import { fetchWallPostsByAmount } from '../../actions/postActions'
import { useDispatch, useSelector } from 'react-redux'
import CircularProgress from '@material-ui/core/CircularProgress'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
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
})

export default function Tape () {
  const classes = useStyles()
  const dispatch = useDispatch()

  const {
    pending,
    userPosts
  } = useSelector(state => ({
    pending: state.posts.pending,
    userPosts: state.posts.userPosts
  }))

  useEffect(() => {
    if (userPosts === null) {
      dispatch(fetchWallPostsByAmount(0))
    }
  }, [userPosts, dispatch])

  if (pending && userPosts === null) {
    return (
      <div className={classes.parent}>
        <CircularProgress size={100}/>
      </div>
    )
  }

  return (
    <InfiniteList
      elements={userPosts}
      fetchHandler={fetchWallPostsByAmount}
    />
  )
}
