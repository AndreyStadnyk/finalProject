import React from 'react'
import InfiniteList from '../InfiniteScroll/InfiniteScroll'

export default function Tape (props) {
  return (
    <div>
      {/* {props.posts.sort((a, b) => a.date - b.date).map(post => ( */}
      {/*  <Post key={post.id} */}
      {/*    post={post} */}
      {/*  /> */}
      {/* ))} */}
      <InfiniteList posts={props.posts}/>
    </div>
  )
}
