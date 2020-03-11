import React from 'react'
import {Icon, Button, MuiThemeProvider} from '@material-ui/core'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt'
import ChatBubbleOutlinedIcon from '@material-ui/icons/ChatBubble'
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined'
import ReplyIcon from '@material-ui/icons/Reply'
import Avatar from '@material-ui/core/Avatar'
import {StylesProvider} from '@material-ui/styles'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { useDispatch, useSelector } from 'react-redux'
import { postTypes, updatePost } from '../../actions/postActions'

import './Post.css'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'

const useStyles = makeStyles(theme => ({

}))
const theme = createMuiTheme({
  overrides: {
    MuiButton: {
      text: {
        padding: '4px 30px',
        textTransform: 'none'
      }
    }
  }
})

export default function Post (props) {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { currentUser } = useSelector(state => ({
    currentUser: state.users.currentUser
  }))

  return (
    <MuiThemeProvider theme={theme}>
      <StylesProvider>
        <div className='card'>
          <div className='subheader'>
            <div className='info'>
              <Avatar src='https://react.semantic-ui.com/images/wireframe/square-image.png' avatar />
              <span className='user-name'>{currentUser.username}</span>
            </div>
            <Icon name='setting' />
          </div>
          <p>date: {props.post.date.toString()}<br/>
            text: {props.post.text}</p>
          <div className='photo-holder' />

          <div className='card-footer'>
            <div className='pre-footer'>
              <ThumbUpAltOutlinedIcon /> {props.post.likes}
            </div>
            <Button onClick={() => dispatch(updatePost({
              id: 1,
              date: new Date(),
              text: 'Lorem ipsum'
            }))}>
              Update post
            </Button>
            <div className='icon-container'>
              <Button

                color='none'
                className={classes.button}
                startIcon={<ThumbUpAltIcon />}
                onClick={() => dispatch({
                  type: postTypes.SWITCH_LIKE,
                  payload: props.post
                })}
              >
                                Like
              </Button>
              {/* This Button uses a Font Icon, see the installation instructions in the Icon component docs. */}
              <Button
                color='none'
                className={classes.button}
                startIcon={<ChatBubbleOutlinedIcon />}
              >
                                Send
              </Button>
              <Button
                color='none'
                className={classes.button}
                startIcon={<ReplyIcon />}
              >
                                Share
              </Button>

            </div>

          </div>
        </div>
      </StylesProvider>
    </MuiThemeProvider>
  )
}
