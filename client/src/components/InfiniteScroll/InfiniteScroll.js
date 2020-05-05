import React from 'react'
import useInfiniteScroll from './useInfiniteScroll'
import Post from '../Post/Post'
import CircularProgress from '@material-ui/core/CircularProgress'

export default function InfiniteList (props) {
  console.log(props)
  const [isFetching, setIsFetching] = useInfiniteScroll(props.fetchHandler)

  return (
    <div
      style={
        {
          overflow: 'auto'
        }
      }
    >
      {props.elements.map(listItem => <Post key={listItem.id} post={listItem}/>)}
      {isFetching && <CircularProgress size={30} thickness={6.2} />
      }
    </div>

  )
}