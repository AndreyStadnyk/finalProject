import React, { useState} from 'react'
import useInfiniteScroll from './useInfiniteScroll'
import Post from '../Post/Post'
import CircularProgress from '@material-ui/core/CircularProgress'

export default function InfiniteList (props) {
  console.log(props.posts)
  const [listItems, setListItems] = useState(props.posts.userPosts)
  const [isFetching, setIsFetching] = useInfiniteScroll(fetchMoreListItems)

  function fetchMoreListItems () {
    setTimeout(() => {
      setListItems(prevState => ([...prevState, ...props.posts.userPosts]))
      console.log(props.posts)
      setIsFetching(false)
    }, 1000)
  }

  return (
    <>
      <div
        style={
          {
            overflow: 'auto'
          }
        }>
      {listItems.map(listItem => <Post post = { listItem } />)}
      {isFetching && <CircularProgress size={30} thickness={6.2}/>}
        </div>
    </>
  )
}