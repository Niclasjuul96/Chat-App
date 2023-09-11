import React from 'react'
import avatar from '../img/juulprofile.png'
const Navbar = () => {
  return (
    <div className='navbar'>
      <span className='header'>Juul Chat</span>
      <div className='user'>
        <img src={avatar} alt="" />
        <span>Niclas</span>
        <button>Logout</button>
      </div>
    </div>
  )
}

export default Navbar