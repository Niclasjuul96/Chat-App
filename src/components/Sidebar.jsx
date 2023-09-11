import React from 'react'
import Navbar from './Navbar'
import Search from './Search'

const sidebar = () => {
  return (
    <div className='sidebar'>
      <Navbar />
      <Search/>
    </div>
  )
}

export default sidebar