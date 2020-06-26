import React, {useState} from 'react'
import Avatar from 'material-ui/Avatar'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import makeStyles from '@material-ui/core/styles/makeStyles'
import CardContent from '@material-ui/core/CardContent'
import Card from '@material-ui/core/Card'
import { pink } from '@material-ui/core/colors'
import DeleteIcon from '@material-ui/icons/Delete'
import ModalDeleteFriend from '../ModalDeleteFriend/ModalDeleteFriend'
import Link from '@material-ui/core/Link'

export default function User (props) {
  const useStyles = makeStyles(theme => ({
    root: {
      width: 'calc(100% - 20px)',
      margin: 10
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
      alignItems: 'center',
      fontSize: 23
    },
    cover: {
      width: 150
    },
    buttonGroup: {
      display: 'flex',
      flexDirection: 'column',
      width: 40
    }
  }))
  const classes = useStyles()

  const username = props.item.username
  const firstName = props.item.firstName
  const lastName = props.item.lastName
  const isUserCurrent = props.isUserCurrent

  const [modalActive, setActive] = useState(false)

  const toggleModal = () => {
    setActive(true)
  }

  const modal = modalActive
    ? <ModalDeleteFriend modalActive={modalActive} post={props.post} setActive={setActive}/> : null

  const deleteButton = isUserCurrent
    ? <IconButton
      className={classes.button}
      style={{ color: pink[500] }}
      onClick={e => {
        e.stopPropagation()
        toggleModal()
      }}
    >
      <DeleteIcon/>
    </IconButton> : null

  return (
    <>
      <MuiThemeProvider>
        {modal}
        <Card variant="outlined" className={classes.root}>
          <div className={classes.details}>
            <CardContent className={classes.content}>
              <div className={classes.details}>
                <Avatar
                  src={'http://procmain.eu/storage/images/UserPic' + username + '.jpg'}
                  size={60} className={classes.avatar}
                />
                <Link className={classes.text} href={'/profile/' + username} color="inherit">
                  <Typography className={classes.text} component="p" variant="subtitle2">
                    {firstName} {lastName}
                  </Typography>
                </Link>
              </div>
            </CardContent>
            {deleteButton}
          </div>
        </Card>
      </MuiThemeProvider>
    </>
  )
}