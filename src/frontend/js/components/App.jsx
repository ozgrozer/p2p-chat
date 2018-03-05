import React from 'react'
import { connect } from 'react-redux'

import MyProfile from './MyProfile'
import Persons from './Persons'
import Messages from './Messages'

import './../../css/style.scss'

const electron = window.require('electron')
const ipcRenderer = electron.ipcRenderer

@connect((store) => {
  return {
    persons: store.persons.list,
    selectedPersonId: store.persons.selectedPersonId
  }
})

class App extends React.Component {
  updatePersonsList (data) {
    this.props.dispatch({
      type: 'UPDATE_PERSONS_LIST',
      payload: data
    })
  }

  addPersonToList (data) {
    this.props.dispatch({
      type: 'ADD_PERSON_TO_LIST',
      payload: data
    })
  }

  componentDidMount () {
    ipcRenderer.send('getPersons')
    ipcRenderer.on('persons', (event, arg) => {
      this.updatePersonsList(arg)
    })
  }

  addFakePerson () {
    const fakePerson = {
      id: 21,
      name: 21,
      statusMessage: 21,
      messages: [
        { direction: 'out', text: 'outgoing ' + 21, time: 1519134357 },
        { direction: 'in', text: 'incoming ' + 21, time: 1519134358 }
      ],
      lastMessage: 'Message ' + 21,
      lastMessageTime: 'Today',
      profilePicture: `https://randomuser.me/api/portraits/men/21.jpg`
    }
    this.addPersonToList(fakePerson)
  }

  render () {
    const countPersons = Object.keys(this.props.persons).length

    return (
      <div id='root2'>
        <div id='title'>
          p2p chat
        </div>

        <div id='app'>
          <div id='left'>
            <MyProfile />

            <Persons />
          </div>

          {(countPersons) ? (
            <div id='right'>
              <Messages />

              <div id='write'>
                <input type='text' placeholder='Write a message...' />
              </div>
            </div>
          ) : (
            <div id='right'>
              <div className='acjc'>
                <div id='addSomeone' onClick={this.addFakePerson.bind(this)}>
                  Add someone...
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default App
