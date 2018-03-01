import React from 'react'
import {connect} from 'react-redux'

@connect((store) => {
  return {
    persons: store.persons.list,
    selectedPersonIndex: store.persons.selectedPersonIndex
  }
})

class Messages extends React.Component {
  render () {
    const getMessages = this.props.persons[this.props.selectedPersonIndex].messages
    const messages = getMessages.map((message, i) => {
      return (
        <div key={i} className={`message ${message.direction}`}>
          {message.text}
        </div>
      )
    })

    return (
      <div id='messagesContainer'>
        <div id='selectedPersonProfile'>
          <div className='person'>
            <div className='personLeft'>
              <img
                className='personPicture'
                src={`https://randomuser.me/api/portraits/men/${this.props.selectedPersonIndex}.jpg`}
              />
            </div>

            <div className='personRight'>
              <div className='personName'>
                {this.props.persons[this.props.selectedPersonIndex].name}
              </div>

              <div className='personLastMessage'>
                {this.props.persons[this.props.selectedPersonIndex].status}
              </div>
            </div>
          </div>
        </div>

        <div id='messages'>
          {messages}
        </div>
      </div>
    )
  }
}

export default Messages
