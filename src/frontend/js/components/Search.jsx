import React from 'react'
import { connect } from 'react-redux'

@connect((store) => {
  return {
    persons: store.persons.list,
    selectedPersonId: store.persons.selectedPersonId
  }
})

class Search extends React.Component {
  addFakePerson () {
    const newPersonId = this.props.persons.length + 1
    const fakePerson = {
      id: newPersonId,
      name: newPersonId,
      statusMessage: newPersonId,
      messages: [
        { direction: 'out', text: 'outgoing ' + newPersonId, time: 1519134357 },
        { direction: 'in', text: 'incoming ' + newPersonId, time: 1519134358 }
      ],
      lastMessage: 'Message ' + newPersonId,
      lastMessageTime: 'Today',
      profilePicture: `https://randomuser.me/api/portraits/men/${newPersonId}.jpg`
    }

    this.props.dispatch({
      type: 'ADD_PERSON_TO_LIST',
      payload: fakePerson
    })

    this.props.dispatch({
      type: 'CHANGE_SELECTED_PERSON',
      payload: newPersonId
    })
  }

  render () {
    return (
      <div id='search'>
        <i id='searchIcon' className='fa fa-search' />

        <input type='text' placeholder='Search' />

        <i id='addIcon' className='fa fa-plus' onClick={this.addFakePerson.bind(this)} />
      </div>
    )
  }
}

export default Search
