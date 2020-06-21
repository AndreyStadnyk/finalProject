import React, { useState } from 'react'
import Avatar from 'material-ui/Avatar'
import {DeleteForever, Edit, Favorite, FavoriteBorder, Message} from '@material-ui/icons'
import './Post.css'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import { pink, lightBlue } from '@material-ui/core/colors'
import {deleteAnotherUserPost, deleteCurrentUserPost, updateLike} from '../../actions/postActions'
import {useDispatch, useSelector} from 'react-redux'
import makeStyles from '@material-ui/core/styles/makeStyles'
import CardContent from '@material-ui/core/CardContent'
import Card from '@material-ui/core/Card'
import ModalPost from '../ModalPost/ModalPost'
import Comment from '../Comment/Comment'
import ModalComment from '../ModalComment/ModalComment'
import Tooltip from '@material-ui/core/Tooltip'
import blue from '@material-ui/core/colors/blue'
import Badge from '@material-ui/core/Badge'

export default function Post (props) {
  const dispatch = useDispatch()
  const [modalActive, setActive] = useState(false)
  const [commentModalActive, setCommentActive] = useState(false)
  const {currentUser} = useSelector(state => ({
    currentUser: state.users.currentUser
  }))
  const author = props.item.authorUsername
  const owner = props.item.ownerUsername
  const isCurrentUserAuthor = currentUser.username === author
  const isCurrentUserOwner = currentUser.username === owner
  const handleClickDelete = () => {
    if (isCurrentUserAuthor && !isCurrentUserOwner) dispatch(deleteAnotherUserPost(props.item.id, props.pageCode))
    else { dispatch(deleteCurrentUserPost(props.item.id, props.pageCode)) }
  }

  const handleLike = () => {
    dispatch(updateLike(props.item.id, props.pageCode))
  }

  const togglePostModal = () => {
    setActive(true)
  }

  const toggleCommentModal = () => {
    setCommentActive(true)
  }

  const postModal = modalActive ? <ModalPost
    modalActive={modalActive}
    post={props.item}
    pageCode={props.pageCode}
    setActive={setActive}/> : null
  const commentModal = commentModalActive ? <ModalComment
    commentModalActive={commentModalActive}
    postId={props.item.id}
    pageCode={props.pageCode}
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
      margin: 10
    },
    content: {
      width: 'calc(100% - 60px)',
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
    buttonGroup: {
      display: 'flex',
      flexDirection: 'column',
      width: 40
    }
  }))
  const classes = useStyles()

  const editButton = isCurrentUserAuthor
    ? <IconButton
      className={classes.button}
      style={{ color: lightBlue.A700 }}
      onClick={e => {
        e.stopPropagation()
        togglePostModal()
      }}
    >
      <Edit/>
    </IconButton> : null

  const deleteButton = isCurrentUserAuthor || isCurrentUserOwner
    ? <IconButton
      className={classes.button}
      style={{ color: pink[500] }}
      onClick={e => {
        e.stopPropagation()
        handleClickDelete()
      }}
    >
      <DeleteForever/>
    </IconButton> : null

  const likeIcon = props.item.likes.some(like => like.userUsername === currentUser.username)
    ? <Favorite/> : <FavoriteBorder/>

  const formatter = new Intl.DateTimeFormat('ru', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric'
  })

  return (
    <>
      {postModal}
      {commentModal}
      <Card variant="outlined" className={classes.root}>
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <div className={classes.details}>
              <Avatar
                src={'http://procmain.eu/storage/images/UserPic' + author + '.jpg'}
                size={60}
                className={classes.avatar}
              />
              <div className={classes.text}>
                <Typography component="p" variant="subtitle2">
                  <strong>{formatter.format(new Date(props.item.date))}</strong>
                </Typography>
                <Typography component="p" variant="subtitle2">
                  From author <strong>{author}</strong> to owner <strong>{owner}</strong>
                </Typography>
                <Typography className={classes.postText} component="p" variant="h6">
                  {props.item.text}
                </Typography>
              </div>
            </div>
            {props.item.comments.map(comment => (
              <Comment key={comment.id} comment={comment} postId={props.item.id} pageCode={props.pageCode}>
              </Comment>
            ))}
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
              <Message/>
            </IconButton>
            <Tooltip title={props.item.likes.map(like => (
              <Typography key={like.userUsername} component="p" variant="body2">
                {like.userUsername}
              </Typography>
            ))} arrow>
              <Badge
                badgeContent={props.item.likes.length}
                color="secondary"
                overlap="circle"
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'left'
                }}
              >
                <IconButton
                  className={classes.button}
                  style={{ color: pink[200] }}
                  onClick={e => {
                    e.stopPropagation()
                    handleLike()
                  }}
                >
                  {likeIcon}
                </IconButton>
              </Badge>
            </Tooltip>
            {editButton}
            {deleteButton}
          </div>
        </div>
      </Card>
    </>
  )
}