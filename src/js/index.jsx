import React from 'react'
import ReactDOM from 'react-dom'
import './../css/style.scss'

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
              Sep 03
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

class App extends React.Component {
  constructor () {
    super()

    this.state = {
      persons: [
        { id: 1, name: 'jeff bezos' },
        { id: 2, name: 'bill gates' },
        { id: 3, name: 'warren buffett' },
        { id: 4, name: 'bernard arnault' },
        { id: 5, name: 'amancio ortega' },
        { id: 6, name: 'mark zuckerberg' },
        { id: 7, name: 'carlos slim helu' },
        { id: 8, name: 'larry ellison' },
        { id: 9, name: 'charles koch' },
        { id: 10, name: 'david koch' }
      ],
      selectedPersonId: 3
    }
  }

  changeSelectedPerson (i) {
    this.setState({ selectedPersonId: i })
  }

  render () {
    return (
      <div id='root2'>
        <div id='title'>
          p2p chat
        </div>

        <div id='app'>
          <div id='left'>
            <Persons
              state={this.state}
              changeSelectedPerson={this.changeSelectedPerson.bind(this)}
            />

            <div id='status'>status</div>
          </div>

          <div id='right'>
            <div id='messages'>
              <div>
                messages of #{this.state.selectedPersonId}
              </div>
            </div>

            <div id='write'>write</div>
          </div>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
