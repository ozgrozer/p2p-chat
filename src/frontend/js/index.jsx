import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import store from './store/index'
import App from './components/App'

const electron = window.require('electron')
const ipcRenderer = electron.ipcRenderer

ipcRenderer.send('getPersons')
ipcRenderer.on('persons', (event, arg) => {
  console.log(arg)
})

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
