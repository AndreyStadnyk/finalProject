import React from 'react'
import useInfiniteScroll from './useInfiniteScroll'
import CircularProgress from '@material-ui/core/CircularProgress'

export default function InfiniteList (props) {
  const isFetching = useInfiniteScroll(props.fetchHandler)
  const Item = props.element

  return (
    <div
      style={
        {
          overflow: 'auto'
        }
      }
    >
      {props.elements && props.elements.map(listItem => <Item key={listItem.id} item={listItem}/>)}
      {isFetching && <CircularProgress size={30} thickness={6.2} />
      }
    </div>

  )
}