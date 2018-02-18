import React from 'react'

class Persons extends React.Component {
  constructor (props) {
    super(props)

    this.state = props.state
  }

  changeSelectedPerson (i) {
    this.setState({ selectedPersonId: i })
    this.props.changeSelectedPerson(i)
  }

  render () {
    const persons = this.state.persons.map(person => {
      const className = person['id'] === this.state.selectedPersonId
      ? 'person selected'
      : 'person'

      return (
        <div key={person['id']} className={className} onClick={this.changeSelectedPerson.bind(this, person['id'])}>
          <div className='personLeft'>
            <div className='profilePicture'>
              <img src='http://www.personalbrandingblog.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640-300x300.png' />
            </div>
          </div>
          <div className='personRight'>
            <div className='name'>
              {person['name']}
            </div>
            <div className='date'>
              Sep 0{person['id']}
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
