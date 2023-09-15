import React, { useContext } from 'react'
import { signOut} from 'firebase/auth'
import { auth } from '../firebase'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext'

const Navbar = () => {
  const { currentUser } = useContext(AuthContext)
  
  const { dispatch } = useContext(ChatContext);
  

  return (
    <div className='navbar'>
      <span className='header'>Juul's Chat</span>
      <div className='user'>
        <img src={currentUser.photoURL} alt="" />
        <span>{currentUser.displayName}</span>
        <button onClick={()=> {
          signOut(auth)
          dispatch({ type:"LOGOUT", payload: currentUser});
          }}>Logout</button>
      </div>
    </div>
  )
}

export default Navbar