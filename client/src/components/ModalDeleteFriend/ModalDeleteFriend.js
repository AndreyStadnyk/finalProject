import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import CheckCircleOutlineSharpIcon from '@material-ui/icons/CheckCircleOutlineSharp'
import HighlightOffSharpIcon from '@material-ui/icons/HighlightOffSharp'
import Button from '@material-ui/core/Button'
import { pink, teal, blue } from '@material-ui/core/colors'
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'

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

  form: {
    marginTop: theme.spacing(5),
    width: '50ch',
    height: '30ch'
  },

  text: {
    height: '7ch',
    textAlign: 'center',
    fontSize: 30,
    color: blue[900]
  },

  buttonGroup: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },

  button: {
    margin: theme.spacing(2),
    width: '15ch',
    color: 'white'
  }
}))

export default function ModalDeleteFriend (props) {
  const classes = useStyles()

  const handleClose = () => {
    props.setActive(false)
  }

  const handleDelete = () => {
    handleClose()
  }

  const handleSubmit = (e) => {
    e.preventDefault()
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
              <p className={classes.text}>Are you sure?</p>
              <div className={classes.buttonGroup}>
                <Button
                  variant="contained"
                  style={{backgroundColor: teal[400]}}
                  endIcon={<CheckCircleOutlineSharpIcon/>}
                  className={classes.button}
                  onClick={handleDelete}
                >YES
                </Button>
                <Button
                  variant="contained"
                  style={{backgroundColor: pink[400]}}
                  endIcon={<HighlightOffSharpIcon/>}
                  className={classes.button}
                  onClick={handleClose}
                >NO
                </Button>
              </div>
            </form>
          </div>
        </Fade>
      </Modal>
    </div>
  )
}
