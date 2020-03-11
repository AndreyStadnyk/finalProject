import React, { Component, PropTypes } from 'react'
import { List, ListItem } from 'material-ui/List'
import Avatar from 'material-ui/Avatar'
import Divider from 'material-ui/Divider'
import { blue500 } from 'material-ui/styles/colors'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import FlatButton from 'material-ui/FlatButton'
import ContentAdd from 'material-ui/svg-icons/content/create'
import { CSSTransition } from 'react-transition-group'
import './app.css'

const overlay = {
  position: 'absolute',
  bottom: 30,
  right: 10
}
const tape = {
  maxWidth: 800
}

class ProfileTape extends Component {
  constructor (props) {
    super(props)
    this.state = {
      open: false,
      topics: [
        {
          title: 'This is the 1st Title',
          content: 'content',
          likes: 5,
          comments: 10,
          views: 14
        },
        {
          title: 'This is the 2nd Title',
          content: 'This is the 2nd content of the application',
          likes: 5,
          comments: 10,
          views: 14
        },
        {
          title: 'This is the 3rd Title',
          content: 'This is the 3rd content of the application',
          likes: 5,
          comments: 10,
          views: 14
        },
        {
          title: 'This is the 4th Title',
          content:
            'This is the 4th content of the application, this is a long content that needs to be show partially',
          likes: 5,
          comments: 10,
          views: 14
        }
      ]
    }
  }

  open = () => this.setState({ open: true })
  close = () => this.setState({ open: false })

  render () {
    return (
      <div style={tape}>
        <div style={overlay}>
          <FloatingActionButton
            mini={true}
            onClick={e => {
              e.stopPropagation()
              alert('Clicked Button')
            }}
          >
            <ContentAdd/>
          </FloatingActionButton>
        </div>
        <List>
          {this.state.topics.map(topic => {
            return (
              <div>
                <ListItem
                  leftAvatar={
                    <Avatar src="https://i.pravatar.cc/300"/>
                  }
                  primaryText={<MyItem {...topic} />}
                  secondaryText={topic.content}
                  secondaryTextLines={1}
                  onClick={this.open}
                />
                <Divider inset={true}/>
              </div>
            )
          })}
        </List>
        <div>
          <PopUp state={this.state} close={this.close}/>
        </div>
      </div>
    )
  }
}

const MyItem = ({ title, content, likes, comments, views }) => {
  return (
    <div>
      <div>
        <span style={{ fontSize: '14', color: blue500 }}>
          {title}
        </span>
      </div>
      <div>
        <span
          style={{ fontSize: '10', color: blue500 }}
        >{`${likes} likes`}</span>{' '}
        <span
          style={{ fontSize: '10', color: blue500 }}
        >{`${comments} Comments`}</span>{' '}
        <span
          style={{ fontSize: '10', color: blue500 }}
        >{`${views} Views`}</span>
      </div>
    </div>
  )
}

const PopUp = ({ state, close }) => {
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
            <span>Я - раскрывушка</span>
            <FlatButton label="Close" onClick={close}/>
          </div>
        </CSSTransition>
        : null}
    </div>
  )
}

export default ProfileTape