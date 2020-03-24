import React from 'react'
import Post from '../Post/Post'

export default function Tape (props) {
  return (
    <div>
      {props.posts.sort((a, b) => a.date - b.date).map(post => (
        <Post
          post = { post }
        />
      ))}
    </div>
  )
}
