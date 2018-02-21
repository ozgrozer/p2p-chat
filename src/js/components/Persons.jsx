import React from 'react'
import {connect} from 'react-redux'

import {changeSelectedPerson} from './../actions/index'

@connect((store) => {
  return {
    persons: store.persons.list,
    selectedPersonIndex: store.persons.selectedPersonIndex
  }
})

class Persons extends React.Component {
  changeSelectedPerson (i) {
    this.props.dispatch(changeSelectedPerson(i))
  }

  render () {
    const persons = this.props.persons.map(person => {
      const className = person.index === this.props.selectedPersonIndex
      ? 'person selected'
      : 'person'

      return (
        <div
          key={person.index}
          className={className}
          onClick={this.changeSelectedPerson.bind(this, person.index)}
        >
          <div className='personLeft'>
            <img className='personPicture' src={`https://randomuser.me/api/portraits/men/${person.index}.jpg`} />
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
