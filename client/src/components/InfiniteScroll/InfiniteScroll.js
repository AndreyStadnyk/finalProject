import React, {useState} from 'react'
import useInfiniteScroll from './useInfiniteScroll'
import Post from '../Post/Post'
import CircularProgress from '@material-ui/core/CircularProgress'

export default function InfiniteList (props) {
  console.log(props)
  const [listItems, setListItems] = useState(props.posts.userPosts)
  const [totalItems, setTotalItems] = useState(props.totalItems)
  const [currentItems, setCurrentItems] = useState(props.posts.currentItems)
  const [isFetching, setIsFetching] = useInfiniteScroll(fetchMoreListItems)

  function fetchMoreListItems () {
    setTimeout(() => {
      console.log('totalItems = ' + totalItems)
      console.log('currentItems = ' + currentItems)
      setListItems(prevState => ([...prevState, ...props.fetchMore(currentItems + 1)]))
      console.log('listItems: ' + listItems)
      setIsFetching(false)
    }, 1000)
  }

  return (

    <div
      style={
        {
          overflow: 'auto'
        }
      }>
      {listItems.map(listItem => <Post post={listItem}/>)}
      {isFetching && <CircularProgress size={30} thickness={6.2}/>}
    </div>

  )
}