import React, { Component } from 'react'
import { List, ListItem } from 'material-ui/List'
import Avatar from 'material-ui/Avatar'
import Divider from 'material-ui/Divider'
// import { blue500 } from 'material-ui/styles/colors'
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

}

class ProfileTape extends Component {
  constructor (props) {
    super(props)
    console.log(props)
    this.state = {
      open: false,
      topics: [
        {
          title: 'This is the 1st Title',
          content: 'This is the 1st content',
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

            'Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил без заметных изменений пять веков, но и перешагнул в электронный дизайн. Его популяризации в новое время послужили публикация листов Letraset с образцами Lorem Ipsum в 60-х годах и, в более недавнее время, программы электронной вёрстки типа Aldus PageMaker, в шаблонах которых используется Lorem Ipsum.',
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
          <div>
            <ListItem
              leftAvatar={
                <Avatar src="https://i.pravatar.cc/300"/>
              }
              primaryText={this.props.post.date.toString()}
              secondaryText={this.props.post.text}
              secondaryTextLines={1}
              onClick={this.open}
            />
            <Divider inset={true}/>
          </div>
        </List>
        <div>
          <PopUp state={this.state} close={this.close}/>
        </div>
      </div>
    )
  }
}

// const MyItem = ({ title, content, likes, comments, views }) => {
//   return (
//     <div>
//       <div>
//         <span style={{ fontSize: '14', color: blue500 }}>
//           {title}
//         </span>
//       </div>
//       <div>
//         <span
//           style={{ fontSize: '10', color: blue500 }}
//         >{`${likes} likes`}</span>{' '}
//         <span
//           style={{ fontSize: '10', color: blue500 }}
//         >{`${comments} Comments`}</span>{' '}
//         <span
//           style={{ fontSize: '10', color: blue500 }}
//         >{`${views} Views`}</span>
//       </div>
//     </div>
//   )
// }

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