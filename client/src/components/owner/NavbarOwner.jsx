import React from 'react'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';

const NavbarOwner = () => {

    const {user} = useAppContext()

  return (
    <div className='flex items-center justify-between px-6 md:px-10 py-4 text-gray-400 border-b border-white/10 bg-white/5 backdrop-blur-md relative transition-all z-20'>
      <Link to='/'>
        <h1 className='text-white font-bold tracking-tight xl:text-3xl'>Smart Urban Mobility</h1>
      </Link>
      <p className='text-white font-medium'>Welcome, {user?.name || "Owner"}</p>
    </div>
  )
}

export default NavbarOwner
