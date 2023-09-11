import React from 'react'
import avatar from '../img/juulprofile.png'

const Search = () => {
  return (
    <div className='search'>
      <div className="searchForm">
        <input type='text' placeholder='Find a user'/>
      </div>
      <div className="userChat">
        <img src={avatar} alt="" />
        <div className="userChatInfo">
          <span>Niclas</span>
        </div>
      </div>
    </div>
  )
}

export default Search