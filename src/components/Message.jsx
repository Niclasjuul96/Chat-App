import React from 'react'
import avatar from '../img/juulprofile.png'

const Message = () => {
  return (
    <div className='message owner'>
      <div className="messageInfo">
          <img src={avatar} alt="" />
          <span>just now</span>
      </div>
      <div className="messageContent">
        <p>Hello</p>
        <img src={avatar} alt="" />
      </div>
    </div>
  )
}

export default Message