import React from 'react'
import ReactDOM from 'react-dom'
import './../css/style.scss'

class App extends React.Component {
  render () {
    return (
      <div id='root2'>
        <div id='title'>p2p chat</div>
        <div id='app'>
          <div id='left'>
            <div id='persons'>persons</div>
            <div id='status'>status</div>
          </div>
          <div id='right'>
            <div id='messages'>messages</div>
            <div id='write'>write</div>
          </div>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
