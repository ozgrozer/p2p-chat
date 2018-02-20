import React from 'react'
import {connect} from 'react-redux'

import MyProfile from './MyProfile'
import Persons from './Persons'
import Messages from './Messages'

import './../../css/style.scss'

class App extends React.Component {
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
