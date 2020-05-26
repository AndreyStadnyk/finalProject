import React from 'react'
import Avatar from 'material-ui/Avatar'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Typography from '@material-ui/core/Typography'

import makeStyles from '@material-ui/core/styles/makeStyles'
import CardContent from '@material-ui/core/CardContent'
import Card from '@material-ui/core/Card'

export default function User (props) {
  // const {currentUser} = useSelector(state => ({
  //   currentUser: state.users.currentUser
  // }))
  const firstName = props.item.firstName
  const lastName = props.item.lastName

  // const isCurrentUserAuthor = currentUser.username === author
  // const isCurrentUserOwner = currentUser.username === owner
  // const handleClickDelete = () => {
  //   if (isCurrentUserAuthor && !isCurrentUserOwner) dispatch(deleteAnotherUserPost(props.post.id))
  //   else { dispatch(deleteCurrentUserPost(props.post.id)) }
  // }

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

  // const deleteButton = isCurrentUserAuthor || isCurrentUserOwner
  //   ? <IconButton
  //     className={classes.button}
  //     style={{ color: pink[500] }}
  //     onClick={e => {
  //       e.stopPropagation()
  //       handleClickDelete()
  //     }}
  //   >
  //     <DeleteForeverIcon/>
  //   </IconButton> : null

  return (
    <>
      <MuiThemeProvider>
        <Card variant="outlined" className={classes.root}>
          <div className={classes.details}>
            <CardContent className={classes.content}>
              <div className={classes.details}>
                <Avatar src="https://i.pravatar.cc/300" size={60} className={classes.avatar}/>
                <div className={classes.text}>
                  <Typography component="p" variant="subtitle2">
                    {firstName} {lastName}
                  </Typography>
                </div>
              </div>

            </CardContent>
            <div className={classes.buttonGroup}>

              {/* {deleteButton} */}
            </div>
          </div>
        </Card>
      </MuiThemeProvider>
    </>
  )
}