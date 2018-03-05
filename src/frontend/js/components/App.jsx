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

  componentDidMount () {
    ipcRenderer.send('getPersons')
    ipcRenderer.on('persons', (event, arg) => {
      this.updatePersonsList(arg)
    })
  }

  render () {
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

          <div id='right'>
            <Messages />

            <div id='write'>
              <input type='text' placeholder='Write a message...' />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
