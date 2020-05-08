import React, { useState } from 'react'
import Avatar from 'material-ui/Avatar'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import EditIcon from '@material-ui/icons/Edit'
import './Post.css'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import { pink, lightBlue } from '@material-ui/core/colors'
import { deletePost, updateLike } from '../../actions/postActions'
import { useDispatch } from 'react-redux'
import makeStyles from '@material-ui/core/styles/makeStyles'
import CardContent from '@material-ui/core/CardContent'
import Card from '@material-ui/core/Card'
import ModalWindow from '../ModalPost/ModalPost'
import Comment from '../Comment/Comment'
import ModalComment from '../ModalComment/ModalComment'
import Tooltip from '@material-ui/core/Tooltip'
import LikeIcon from '@material-ui/icons/Favorite'
import MessageIcon from '@material-ui/icons/Message'
import blue from '@material-ui/core/colors/blue'

export default function Post (props) {
  const dispatch = useDispatch()
  const [modalActive, setActive] = useState(false)
  const [commentModalActive, setCommentActive] = useState(false)

  const handleClickDelete = () => {
    dispatch(deletePost(props.post.id))
  }

  const handleLike = () => {
    dispatch(updateLike(props.post.id))
  }

  const toggleModal = () => {
    setActive(true)
  }

  const toggleCommentModal = () => {
    setCommentActive(true)
  }

  const modal = modalActive
    ? <ModalWindow modalActive={modalActive} post={props.post} setActive={setActive}/> : null
  const commentModal = commentModalActive ? <ModalComment
    commentModalActive={commentModalActive}
    postId={props.post.id}
    setCommentActive={setCommentActive}/> : null

  const useStyles = makeStyles(theme => ({
    root: {
      width: 'calc(100% - 2px)',
      marginBottom: 10
    },
    details: {
      display: 'flex'
    },
    avatar: {
      margin: 20
    },
    content: {
      width: 'calc(100% - 170px)',
      wordWrap: 'break-word'
    },
    text: {
      display: 'flex',
      flexDirection: 'column'
    },
    cover: {
      width: 150
    },
    postText: {
      marginBottom: 20
    },
    like: {
      height: 20,
      width: 100
    },
    buttonComment: {
      width: 100,
      height: 35
    },
    buttonGroup: {
      display: 'flex',
      flexDirection: 'column',
      width: 40
    }
  }))
  const classes = useStyles()

  return (
    <>
      {modal}
      {commentModal}
      <Card variant="outlined" className={classes.root}>
        <div className={classes.details}>
          <div className={classes.avatar}>
            <Avatar src="https://i.pravatar.cc/300"/>
          </div>
          <CardContent className={classes.content}>
            <div className={classes.text}>
              <Typography component="p" variant="subtitle2">
                Author: {props.post.authorUsername}
              </Typography>
              <Typography component="p" variant="subtitle2">
                {props.post.date.toString()}
              </Typography>
              <Typography className={classes.postText} component="p" variant="h6">
                {props.post.text}
              </Typography>
              {props.post.comments.map(comment => (
                <Comment comment={comment} postId={props.post.id}>
                </Comment>
              ))}
              <Tooltip title={props.post.likes.map(like => (
                <Typography component="p" variant="body2">
                  {like.userUsername}
                </Typography>
              ))} arrow>
                <Typography
                  className={classes.like}
                  component="p" variant="overline"
                  onClick={e => {
                    e.stopPropagation()
                    handleLike()
                  }}>
                  I like it!({props.post.likes.length})
                </Typography>
              </Tooltip>
            </div>
          </CardContent>
          <div className={classes.buttonGroup}>
            <IconButton
              className={classes.button}
              style={{ color: blue[800] }}
              onClick={e => {
                e.stopPropagation()
                toggleCommentModal()
              }}
            >
              <MessageIcon/>
            </IconButton>
            <IconButton
              className={classes.button}
              style={{ color: pink[200] }}
              onClick={e => {
                e.stopPropagation()
                handleLike()
              }}
            >
              <LikeIcon/>
            </IconButton>

            <IconButton
              className={classes.button}
              style={{ color: lightBlue.A700 }}
              onClick={e => {
                e.stopPropagation()
                toggleModal()
              }}
            >
              <EditIcon/>
            </IconButton>

            <IconButton
              className={classes.button}
              style={{ color: pink[500] }}
              onClick={e => {
                e.stopPropagation()
                handleClickDelete()
              }}
            >
              <DeleteForeverIcon/>
            </IconButton>
          </div>
        </div>
      </Card>
    </>
  )
}