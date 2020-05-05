import React, {useState} from 'react'
import useInfiniteScroll from './useInfiniteScroll'
import Post from '../Post/Post'
import CircularProgress from '@material-ui/core/CircularProgress'

export default function InfiniteList (props) {
  console.log(props)
  const [isFetching, setIsFetching] = useState(true)

    useInfiniteScroll(props.fetchHandler)
  // }
  // function fetchMoreListItems () {
  //   setTimeout(() => {
  //     // setListItems(prevState => ([...prevState, ...props.fetchMore(currentItems + 1)]))
  //     // setListItems(prevState => ([...prevState, ...props.fetchHandler]))
  //     //setListItems(prevState => ([...prevState, ...props.posts.userPosts]))
  //     // console.log('listItems: ' + listItems)
  //     setIsFetching(false)
  //   }, 1000)
  //   return props.fetchHandler
  // }

  return (
    <div
      style={
        {
          overflow: 'auto'
        }
      }>
      {props.elements.map(listItem => <Post key={listItem.id} post={listItem}/>)}
      {/* {isFetching && <CircularProgress size={30} thickness={6.2}/>} */}
    </div>

  )
}