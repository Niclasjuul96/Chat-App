import React from 'react'
import avatar from '../img/juulprofile.png'

const Chats = () => {
  return (
    <div className='chats'>
      <div className="userChat">
        <img src={avatar} alt="" />
        <div className="userChatInfo">
          <span>Niclas</span>
          <p>Hello</p>
        </div>
      </div>
      <div className="userChat">
        <img src={avatar} alt="" />
        <div className="userChatInfo">
          <span>Niclas</span>
          <p>Hello</p>
        </div>
      </div>
      <div className="userChat">
        <img src={avatar} alt="" />
        <div className="userChatInfo">
          <span>Niclas</span>
          <p>Hello</p>
        </div>
      </div>
      <div className="userChat">
        <img src={avatar} alt="" />
        <div className="userChatInfo">
          <span>Niclas</span>
          <p>Hello</p>
        </div>
      </div>
    </div>
  )
}

export default Chats