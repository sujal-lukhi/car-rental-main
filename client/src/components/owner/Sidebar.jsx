import React, { useState } from 'react'
import { assets, ownerMenuLinks } from '../../assets/assets'
import { NavLink, useLocation } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

import { motion } from 'framer-motion';

const Sidebar = () => {

    const {user, axios, fetchUser} = useAppContext()
    const location = useLocation()
    const [image, setImage] = useState('')

    const updateImage = async ()=>{
        try {
          const formData = new FormData()
          formData.append('image', image)

          const {data} = await axios.post('/api/owner/update-image', formData)

          if(data.success){
            fetchUser()
            toast.success(data.message)
            setImage('')
          }else{
            toast.error(data.message)
          }
        } catch (error) {
          toast.error(error.message)
        }
    }

  return (
    <motion.div 
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
      className='relative h-full md:flex flex-col items-center pt-6 max-w-[60px] md:max-w-64 w-full border border-white/10 rounded-2xl bg-white/5 backdrop-blur-2xl shadow-xl shadow-black/20 text-sm z-10 overflow-hidden'>
      
      <div className='w-full px-2 md:px-4'>
        <p className='text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4 px-2 max-md:hidden'>Main Menu</p>
        
        {ownerMenuLinks.map((link, index)=>(
            <NavLink key={index} to={link.path} className={`relative flex items-center gap-3 w-full py-3 px-2 md:px-4 rounded-xl mb-2 transition-all duration-300 ${link.path === location.pathname ? 'bg-gradient-to-r from-blue-500/20 to-indigo-500/20 text-white font-semibold shadow-inner border border-white/10' : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'}`}>
                <img src={link.path === location.pathname ? link.coloredIcon : link.icon} alt="car icon" className={`w-5 h-5 ${link.path === location.pathname ? 'invert brightness-0 drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]' : 'opacity-70 invert'}`} />
                <span className='max-md:hidden'>{link.name}</span>
                {link.path === location.pathname && (
                    <motion.div layoutId="sidebar-active" className='absolute right-0 md:right-2 w-1.5 h-6 rounded-full bg-blue-400 shadow-[0_0_10px_rgba(96,165,250,0.8)]'></motion.div>
                )}
            </NavLink>
        ))}
      </div>
    </motion.div>
  )
}

export default Sidebar
