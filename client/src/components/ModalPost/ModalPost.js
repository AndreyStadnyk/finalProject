import React, {useState} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import {addPost, updatePost} from '../../actions/postActions'
import {useDispatch, useSelector} from 'react-redux'
import {Publish} from '@material-ui/icons'
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'
import {toastr} from 'react-redux-toastr'

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },

  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '3px solid #3f51b5',
    boxShadow: theme.shadows[10],
    padding: theme.spacing(3, 3, 3)
  },

  root: {
    '& > *': {
      margin: theme.spacing(2)
    }
  },

  button: {
    margin: theme.spacing(2)
  },

  form: {
    marginTop: theme.spacing(5),
    width: '100ch',
    height: '40ch',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },

  text: {
    width: '75ch',
    height: '50ch'
  }
}))

export default function ModalPost (props) {
  const classes = useStyles()
  const dispatch = useDispatch()
  const {
    currentUser
  } = useSelector(state => ({
    currentUser: state.users.currentUser
  }))

  const [text, setText] = useState(props.post ? props.post.text : '')
  const post = props.post

  const handleClose = () => {
    props.setActive(false)
  }

  const handleClick = () => {
    if (props.post) {
      post.text = text
      dispatch(updatePost(post))
    } else if (text && !props.post) {
      dispatch(addPost({
        text: text
      }, currentUser.username))
    } else {
      toastr.info('Ooops!', 'Your post was empty')
    }
    handleClose()
  }

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  const onChange = (e) => {
    setText(e.target.value)
  }

  return (
    <div>
      <Modal
        className={classes.modal}
        open={props.modalActive}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={props.modalActive}>
          <div className={classes.paper}>
            <form className={classes.form} noValidate autoComplete="off"
              onSubmit={handleSubmit}
            >
              <TextField className={classes.text}
                id="outlined-full-width-error-helper-text"
                multiline
                rows="10"
                label="What's on your mind?"
                variant="outlined"
                onChange={onChange}
                value={text}
              />
              <Button
                variant="contained"
                color="primary"
                endIcon={<Publish/>}
                className={classes.button}
                onClick={handleClick}
              >POST
              </Button>
            </form>
          </div>
        </Fade>
      </Modal>
    </div>
  )
}
