import React, {useState} from 'react'
import Avatar from 'material-ui/Avatar'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import EditIcon from '@material-ui/icons/Edit'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import {pink, lightBlue} from '@material-ui/core/colors'
import {deleteComment} from '../../actions/postActions'
import {useDispatch} from 'react-redux'
import makeStyles from '@material-ui/core/styles/makeStyles'
import CardContent from '@material-ui/core/CardContent'
import Card from '@material-ui/core/Card'
import ModalComment from '../ModalComment/ModalComment'

export default function Comment (props) {
  const dispatch = useDispatch()
  const [commentModalActive, setCommentActive] = useState(false)

  const handleClickDelete = () => {
    dispatch(deleteComment(props.comment.id))
  }

  const toggleCommentModal = () => {
    setCommentActive(true)
  }

  const commentModal = commentModalActive ? <ModalComment commentModalActive={commentModalActive}
    comment={props.comment} setCommentActive={setCommentActive}/> : null

  const useStyles = makeStyles(theme => ({
    root: {
      boxShadow: '1px 2px 1px 1px rgba(0,0,0,0.2), 2px 1px 1px 1px rgba(0,0,0,0.14), 2px 1px 3px 1px rgba(0,0,0,0.12)',
      borderRadius: 15
    },
    details: {
      display: 'flex'
    },
    avatar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 60
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
      width: 151
    },
    controls: {
      display: 'flex',
      alignItems: 'center',
      paddingLeft: theme.spacing(1),
      paddingBottom: theme.spacing(1)
    },
    button: {
      width: 40,
      height: 40
    }
  }))
  const classes = useStyles()

  return (
    <>
      {commentModal}
      <Card className={classes.root}>
        <div className={classes.details}>
          <div className={classes.avatar}>
            <Avatar src="https://i.pravatar.cc/300"/>
          </div>
          <CardContent className={classes.content}>
            <div className={classes.text}>
              <Typography component="p" variant="subtitle2">
                Author: {props.comment.authorUsername}
              </Typography>
              <Typography component="p" variant="body1">
                {props.comment.text}
              </Typography>
            </div>
          </CardContent>
          <IconButton
            className={classes.button}
            style={{color: lightBlue.A700}}
            onClick={e => {
              e.stopPropagation()
              toggleCommentModal()
            }}
          >
            <EditIcon/>
          </IconButton>

          <IconButton
            className={classes.button}
            style={{color: pink[500]}}
            onClick={e => {
              e.stopPropagation()
              handleClickDelete()
            }}
          >
            <DeleteForeverIcon/>
          </IconButton>
        </div>
      </Card>
    </>
  )
}
