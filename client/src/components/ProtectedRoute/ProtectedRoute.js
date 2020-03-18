import React, { Component } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import CircularProgress from '@material-ui/core/CircularProgress'
import Profile from '../Profile/Profile'
import Wall from '../Wall/Wall'
import NotFound from '../NotFound/NotFound'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchCurrentUser } from '../../actions/profileActions'

class ProtectedRouter extends Component {
  componentWillMount () {
    const { fetchUser } = this.props
    fetchUser()
  }

  render () {
    const { currentUser, pending } = this.props

    if (pending) {
      return <CircularProgress />
    }

    if (currentUser) {
      return (
        <Switch>
          <Route exact path='/profile' component={Profile}/>
          <Route exact path='/tape' component={Wall}/>
          <Route exact path='/*' component={NotFound}/>
        </Switch>
      )
    } else {
      return <Redirect to='/sign-in'/>
    }
  }
}

const mapStateToProps = state => ({
  pending: state.users.pending,
  currentUser: state.users.currentUser,
  error: state.users.error
})

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchUser: fetchCurrentUser
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProtectedRouter)
