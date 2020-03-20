import React, { Component } from 'react'
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button'
import { updateUser } from '../../actions/profileActions'
import CardActions from '@material-ui/core/CardActions'

function mapStateToProps (state) {
  return {}
}

function mapDispatchToProps (dispatch) {
  return {}
}

class ProfileUpdate extends Component {
  render () {
    return (
      <div>
        <Button size="small" color="primary" onClick={() => dispatch(updateUser({
          username: 'PMatroskin',
          firstName: 'Petya',
          lastName: 'Matroskin',
          address: 'Wuhan',
          gender: 'male',
          password: '12345'
        }))}>
          Update user
        </Button>
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
)(ProfileUpdate)