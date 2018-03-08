import React from 'react'
import { connect } from 'react-redux'

import MyProfile from './MyProfile'
import Search from './Search'
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
  componentDidMount () {
    ipcRenderer.send('getPersonsAndMessages')
    ipcRenderer.on('personsAndMessages', (event, data) => {
      this.props.dispatch({
        type: 'UPDATE_PERSONS_LIST',
        payload: data
      })

      this.props.dispatch({
        type: 'CHANGE_SELECTED_PERSON',
        payload: data[0].id
      })
    })
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

            <Search />

            <Persons />
          </div>

          {(countPersons) ? (
            <Messages />
          ) : (
            <div id='right'>
              <div className='acjc'>
                <div id='addSomeone'>
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
