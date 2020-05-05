import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import SwipeableViews from 'react-swipeable-views'
import {makeStyles, useTheme} from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import PostAddIcon from '@material-ui/icons/PostAdd'
import Tape from '../Tape/Tape'
import {useDispatch, useSelector} from 'react-redux'
import {fetchUserPosts} from '../../actions/postActions'
import ModalWindow from '../ModalPost/ModalPost'
import { updateUser } from '../../actions/profileActions'
import ProfileForm from './ProfileForm'

function TabPanel (props) {
  const {children, value, index, ...other} = props

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
}

function a11yProps (index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`
  }
}

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper

  },
  parent: {
    width: '100%',
    height: '100%',
    position: 'fixed',
    top: 0,
    left: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#ddd'
  }
}))

export default function ProfileTabs () {
  const classes = useStyles()
  const theme = useTheme()
  const [value, setValue] = useState(0)
  const [modalActive, setActive] = useState(false)
  const dispatch = useDispatch()

  const {
    pending,
    userPosts,
    currentUser
  } = useSelector(state => ({
    pending: state.posts.pending,
    userPosts: state.posts.userPosts,
    currentUser: state.users.currentUser
  }))

  useEffect(() => {
    if (userPosts === null) {
      dispatch(fetchUserPosts())
    }
  }, [userPosts, dispatch])

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const handleChangeIndex = index => {
    setValue(index)
  }

  const toggleModal = () => {
    setActive(true)
  }

  if (pending) {
    return (
      <div className={classes.parent}>
        <CircularProgress size={100}/>
      </div>
    )
  }
  const modal = modalActive
    ? <ModalWindow modalActive={modalActive} setActive={setActive}/> : null
  return (
    <>
      {modal}
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            aria-label="full width tabs"
          >
            <Tab label="Posts" {...a11yProps(0)} />
            <Tab label="Edit profile" {...a11yProps(1)} />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              startIcon={<PostAddIcon/>}
              onClick={toggleModal}
            >
              Add post
            </Button>
            <Tape posts={userPosts}/>
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            <ProfileForm userAction={updateUser} buttonLabel="Update" currentUser={currentUser}/>
          </TabPanel>
        </SwipeableViews>
      </div>
    </>
  )
}