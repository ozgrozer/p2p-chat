import React from 'react'
import {connect} from 'react-redux'

import {changeSelectedPerson} from './../actions/index'

@connect((store) => {
  return {
    persons: store.persons.list,
    selectedPersonId: store.persons.selectedPersonId
  }
})

class Persons extends React.Component {
  changeSelectedPerson (i) {
    this.props.dispatch(changeSelectedPerson(i))
  }

  render () {
    const persons = this.props.persons.map(person => {
      const className = person['id'] === this.props.selectedPersonId
      ? 'person selected'
      : 'person'

      return (
        <div
          key={person['id']}
          className={className}
          onClick={this.changeSelectedPerson.bind(this, person['id'])}
        >
          <div className='personLeft'>
            <img className='profilePicture' src={`https://randomuser.me/api/portraits/men/${person['id']}.jpg`} />
          </div>
          <div className='personRight'>
            <div className='name'>
              {person['name']}
            </div>
            <div className='date'>
              Sep {person['id']}
            </div>
            <div className='lastMessage'>
              message #{person['id']}
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
