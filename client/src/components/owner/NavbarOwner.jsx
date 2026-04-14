import React from 'react'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';

import { motion } from 'framer-motion';

const NavbarOwner = () => {

    const {user} = useAppContext()

  return (
    <motion.div 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className='flex items-center justify-between px-6 md:px-8 py-4 mx-4 mt-4 border border-white/10 bg-white/5 backdrop-blur-2xl rounded-2xl relative z-20 shadow-xl shadow-black/20'>
      <Link to='/'>
        <h1 className='text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 font-bold tracking-tight xl:text-3xl drop-shadow-md'>Admin Panel</h1>
      </Link>
      
      <div className='flex items-center gap-3'>
        <div className='flex items-center justify-center w-10 h-10 border border-white/20 rounded-full bg-gradient-to-tr from-blue-500/20 to-indigo-500/20 shadow-inner'>
          <span className='text-white font-semibold text-sm'>{user?.name?.charAt(0).toUpperCase() || "O"}</span>
        </div>
        <p className='text-gray-200 font-medium max-md:hidden'>Welcome, <span className='text-white'>{user?.name || "Owner"}</span></p>
      </div>
    </motion.div>
  )
}

export default NavbarOwner
