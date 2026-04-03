import React, { useState } from 'react'
import { assets, ownerMenuLinks } from '../../assets/assets'
import { NavLink, useLocation } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

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
    <div className='relative min-h-screen md:flex flex-col items-center pt-8 max-w-13 md:max-w-60 w-full border-r border-white/10 bg-white/5 backdrop-blur-md text-sm z-10'>
      <div className='w-full'>
        {ownerMenuLinks.map((link, index)=>(
            <NavLink key={index} to={link.path} className={`relative flex items-center gap-2 w-full py-3 pl-4 first:mt-6 transition-all ${link.path === location.pathname ? 'bg-white/10 text-white font-semibold' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
                <img src={link.path === location.pathname ? link.coloredIcon : link.icon} alt="car icon" className={link.path === location.pathname ? 'invert brightness-0' : 'opacity-70 invert'} />
                <span className='max-md:hidden'>{link.name}</span>
                <div className={`${link.path === location.pathname && 'bg-white'} w-1.5 h-8 rounded-l right-0 absolute`}></div>
            </NavLink>
        ))}
      </div>
    </div>
  )
}

export default Sidebar
