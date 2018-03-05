import React from 'react'
import { connect } from 'react-redux'

@connect((store) => {
  return {
    persons: store.persons.list,
    selectedPersonId: store.persons.selectedPersonId
  }
})

class Messages extends React.Component {
  render () {
    const person = this.props.persons[this.props.selectedPersonId] ||
      { name: '', statusMessage: '', messages: [] }

    const messages = person.messages.map((message, i) => {
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
                src={`https://randomuser.me/api/portraits/men/${this.props.selectedPersonId}.jpg`}
              />
            </div>

            <div className='personRight'>
              <div className='personName'>
                {person.name}
              </div>

              <div className='personLastMessage'>
                {person.statusMessage}
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
