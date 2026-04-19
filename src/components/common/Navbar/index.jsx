import React from 'react'
import { Logo } from '../../../assets'

const Navbar = () => {
  return (
    <div className='text-white font-bold h-12 flex items-center justify-center text-xl gap-2'><img src={Logo} alt="nav-icon" className='w-10 h-10' />Weather Check</div>
  )
}

export default Navbar
