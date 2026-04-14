import React, { useEffect } from 'react'
import NavbarOwner from '../../components/owner/NavbarOwner'
import Sidebar from '../../components/owner/Sidebar'
import { Outlet } from 'react-router-dom'
import { useAppContext } from '../../context/AppContext'

const Layout = () => {
  const {isOwner, navigate} = useAppContext()

  useEffect(()=>{
    if(!isOwner){
      navigate('/')
    }
  },[isOwner])
  return (
    <div className='flex flex-col min-h-screen bg-[#0B0F19] relative overflow-hidden text-gray-200'>
      <div className='absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 blur-[150px] rounded-full pointer-events-none'></div>
      <div className='absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-500/10 blur-[150px] rounded-full pointer-events-none'></div>

      <div className='z-10 flex flex-col flex-1 h-screen'>
        <NavbarOwner />
        <div className='flex flex-1 overflow-hidden p-4 gap-4'>
          <Sidebar />
          <div className='flex-1 overflow-y-auto no-scrollbar'>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Layout
