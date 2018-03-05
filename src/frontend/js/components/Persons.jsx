import React from 'react'
import { connect } from 'react-redux'

@connect((store) => {
  return {
    persons: store.persons.list,
    selectedPersonId: store.persons.selectedPersonId
  }
})

class Persons extends React.Component {
  changeSelectedPerson (id) {
    this.props.dispatch({
      type: 'CHANGE_SELECTED_PERSON',
      payload: id
    })
  }

  render () {
    const persons = this.props.persons.map(person => {
      const selectedClass = person.id === this.props.selectedPersonId ? 'selected' : ''

      return (
        <div
          key={person.id}
          className={`person ${selectedClass}`}
          onClick={this.changeSelectedPerson.bind(this, person.id)}
        >
          <div className='personLeft'>
            <img className='personPicture' src={`https://randomuser.me/api/portraits/men/${person.id}.jpg`} />
          </div>

          <div className='personRight'>
            <div className='personName'>
              {person.name}
            </div>

            <div className='personLastMessageTime'>
              {person.lastMessageTime}
            </div>

            <div className='personLastMessage'>
              {person.lastMessage}
            </div>
          </div>
        </div>
      )
    })

    return (
      <div id='persons'>
        {persons}
      </div>
    )
  }
}

export default Persons
