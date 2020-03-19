import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import SwipeableViews from 'react-swipeable-views'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Tape from '../Tape/Tape'
import {useDispatch, useSelector} from 'react-redux'
import {fetchUserPosts} from '../../actions/postActions'

function TabPanel (props) {
  const { children, value, index, ...other } = props

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
  const [value, setValue] = React.useState(0)
  const dispatch = useDispatch()

  const {
    pending,
    userPosts
  } = useSelector(state => ({
    pending: state.posts.pending,
    userPosts: state.posts.userPosts
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

  if (pending) {
    return (
      <div className={classes.parent}>
        <CircularProgress size={100} />
      </div>
    )
  }

  return (
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
          <Tab label="Friends" {...a11yProps(1)} />
          <Tab label="Requests" {...a11yProps(2)} />
          <Tab label="Messages" {...a11yProps(3)} />

        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <Tape posts={userPosts} />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          Item Two
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          Item Three
        </TabPanel>
        <TabPanel value={value} index={3} dir={theme.direction}>
          Item Four
        </TabPanel>

      </SwipeableViews>
    </div>
  )
}