import React, {useState} from 'react'
import { List, ListItem } from 'material-ui/List'
import Avatar from 'material-ui/Avatar'
import Divider from 'material-ui/Divider'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import FlatButton from 'material-ui/FlatButton'
import ContentAdd from 'material-ui/svg-icons/content/create'
import { CSSTransition } from 'react-transition-group'
import './Post.css'

const overlay = {
  position: 'absolute',
  bottom: 30,
  right: 10
}

const tape = {}

export default function Post (props) {
  const [, setOpenState] = useState(false)
  const open = () => setOpenState(true)
  const close = () => setOpenState(false)

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
        <div>
          <ListItem
            leftAvatar={
              <Avatar src="https://i.pravatar.cc/300"/>
            }
            primaryText={props.post.date.toString()}
            secondaryText={props.post.text}
            secondaryTextLines={1}
            onClick={open}
          />
          <Divider inset={true}/>
        </div>
      </List>
      <div>
        <PopUp state={props} close={close}/>
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
            <span>THIS POST ID: {state.id}</span>
            <FlatButton label="Close" onClick={close}/>
          </div>
        </CSSTransition>
        : null}
    </div>
  )
}
