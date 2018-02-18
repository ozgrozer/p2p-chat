import React from 'react'
import {connect} from 'react-redux'

@connect((store) => {
  return {
    selectedPersonId: store.persons.selectedPersonId
  }
})

class Messages extends React.Component {
  render () {
    return (
      <div>
        messages of #{this.props.selectedPersonId}
      </div>
    )
  }
}

export default Messages
