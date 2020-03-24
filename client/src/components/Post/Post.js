import React, {useState} from 'react'
import Avatar from 'material-ui/Avatar'
import FlatButton from 'material-ui/FlatButton'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import {CSSTransition} from 'react-transition-group'
import './Post.css'
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import {pink, lightBlue} from "@material-ui/core/colors";
import {deletePost} from "../../actions/postActions";
import {useDispatch, useSelector} from "react-redux";
import makeStyles from "@material-ui/core/styles/makeStyles";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";

export default function Post(props) {
  const [, setOpenState] = useState(false)
  const open = () => setOpenState(true)
  const close = () => setOpenState(false)
  const dispatch = useDispatch();

  const handleClickDelete = () => {
    dispatch(deletePost(props.post.id));
  }


  const useStyles = makeStyles(theme => ({
    root: {
      boxShadow: '1px 2px 1px 1px rgba(0,0,0,0.2), 2px 1px 1px 1px rgba(0,0,0,0.14), 2px 1px 3px 1px rgba(0,0,0,0.12)',
      borderRadius: 15
    },
    details: {
      display: 'flex',
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
      flexDirection: 'column',
    },
    cover: {
      width: 151,
    },
    controls: {
      display: 'flex',
      alignItems: 'center',
      paddingLeft: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
    button: {
      width: 40,
      height: 40
    }
  }));
  const classes = useStyles();

  return (
      <Card className={classes.root}>
        <div className={classes.details}>
          <div className={classes.avatar}>
            <Avatar  src="https://i.pravatar.cc/300"/>
          </div>
          <CardContent className={classes.content} >
            <div className={classes.text}>
            <Typography component="p" variant="p">
              {props.post.date.toString()}
            </Typography>
            <Typography
              component="p" variant="p">
              {props.post.text}
            </Typography>
            </div>
          </CardContent>
          <IconButton
            className={classes.button}
            style={{color: lightBlue.A700}}
            onClick={e => {
              e.stopPropagation()
              alert('Clicked Button')
            }}
          >
            <EditIcon/>
          </IconButton>

          <IconButton
            className={classes.button}
            style={{color: pink[500]}}
            onClick={e => {
              e.stopPropagation();
              handleClickDelete();
            }}
          >
            <DeleteForeverIcon/>
          </IconButton>
        </div>
      </Card>
  )
}

const PopUp = ({state, close}) => {
  return (
    <div>
      {state.open
        ? <CSSTransition
          transitionName="pop"
          transitionEnterTimeout={2000}
          transitionLeaveTimeout={300}
        >
          <div
            style={{
              width: window.innerWidth,
              height: window.innerHeight,
              position: 'fixed',
              left: 0,
              top: 0,
              overflowX: 'hidden',
              backgroundColor: 'white',
              zIndex: '999'
            }}
          >
            <span>THIS POST ID: {state.id}</span>
            <FlatButton label="Close" onClick={close}/>
          </div>
        </CSSTransition>
        : null}
    </div>
  )
}
