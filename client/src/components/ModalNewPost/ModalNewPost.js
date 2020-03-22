import React, {forwardRef, useEffect, useImperativeHandle, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {addPost} from "../../actions/postActions";
import {useDispatch} from "react-redux";

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '3px solid #3f51b5',
    boxShadow: theme.shadows[10],
    padding: theme.spacing(3, 3, 3),
  },

  root: {
    '& > *': {
      margin: theme.spacing(2),
      width: '125ch',
      height: '1ch',
    },
  },

  button: {
    margin: theme.spacing(1),

  },

  form: {
    marginTop: theme.spacing(5),
    width: '125ch',
    height: '40ch',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },

  text: {
    width: '75ch',
    height: '50ch',
  }
}));

function ModalNewPost(props, ref) {

  const classes = useStyles();
  const dispatch = useDispatch();
  console.log(props.modalActive);

  const [open, setOpen] = useState(() => {
    console.log(props.modalActive);
    // console.log(ref.current.value);
    if (props.modalActive === undefined || !props.modalActive) {
      console.log(props.modalActive);
      return false;

    } else {
      console.log(props.modalActive);
      return true
    }
  })

let counter = 0;
  useEffect(() => {
    if (props.modalActive === true) {
      console.log("in useEffect");
      handleOpen();
    }
  } )

  useImperativeHandle(ref,
    () => ({
      value: open
    }),
    [open]
  );

  console.log(open);
  const handleOpen = () => {
    setOpen(true);
    counter++;
    console.log("handleOpen");
  };

  const handleClose = () => {
    setOpen(false);
    console.log("handleClose");

  };

  const handleClick = () => {
    dispatch(addPost({
      text: 'Lorem'
    }, "PMatroskin"));
    handleClose();
  }

  return (
    <div>
      <Modal
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <form className={classes.form} noValidate autoComplete="off" flexContainerVertical>
              <TextField className={classes.text} id="outlined-basic" label="What's on your mind?" variant="outlined"/>

              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={handleClick}
              >
                Post
              </Button>
            </form>
          </div>
        </Fade>
      </Modal>
    </div>
  )
}

export default forwardRef(ModalNewPost);