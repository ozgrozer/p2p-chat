import React from 'react'
import {connect} from 'react-redux'

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
            <Persons />

            <div id='status'>status</div>
          </div>

          <div id='right'>
            <div id='messages'>
              <Messages />
            </div>

            <div id='write'>write</div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
