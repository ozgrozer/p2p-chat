import React from 'react'

class MyProfile extends React.Component {
  render () {
    return (
      <div id='myProfile'>
        <div className='person'>
          <div className='personLeft'>
            <img className='personProfilePicture' src='https://randomuser.me/api/portraits/men/11.jpg' />
          </div>

          <div className='personRight'>
            <div className='personName'>
              My Name
            </div>

            <div className='personLastMessage'>
              My Status
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MyProfile
