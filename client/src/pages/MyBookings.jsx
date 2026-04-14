import React, { useEffect, useState } from 'react'
import { assets} from '../assets/assets'
import Title from '../components/Title'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'

const MyBookings = () => {

  const { axios, user, currency } = useAppContext()

  const [bookings, setBookings] = useState([])

  const fetchMyBookings = async ()=>{
    try {
      const { data } = await axios.get('/api/bookings/user')
      if (data.success){
        setBookings(data.bookings)
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(()=>{
    user && fetchMyBookings()
  },[user])

  return (
    <div className="relative min-h-screen bg-[#0B0F19] overflow-hidden pt-28 pb-20">
      
      {/* Background Mesh */}
      <div className="absolute top-[5%] left-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[150px] -z-10 pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[150px] -z-10 pointer-events-none" />


      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className='px-6 md:px-16 lg:px-24 xl:px-32 2xl:px-48 text-sm max-w-7xl mx-auto z-10 relative'
      >

        <Title title='My Bookings'
         subTitle='View and manage your recent reservations'
         align="left"/>

         <div className="mt-8">
          {bookings.map((booking, index)=>(
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              key={booking._id} 
              className='grid grid-cols-1 md:grid-cols-4 gap-6 p-6 border border-white/10 bg-white/5 backdrop-blur-3xl rounded-3xl shadow-[0_20px_40px_rgba(0,0,0,0.4)] hover:border-white/20 hover:shadow-[0_20px_50px_rgba(99,102,241,0.15)] transition-all duration-300 mb-6 relative overflow-hidden group'
            >
              
              <div className='md:col-span-1 z-10'>
                <div className='rounded-2xl overflow-hidden mb-4 border border-white/10 shadow-lg'>
                  <img src={booking.car.image} alt="" className='w-full h-auto aspect-video object-cover transition-transform duration-700 group-hover:scale-105'/>
                </div>
                <p className='text-xl font-bold mt-2 text-white group-hover:text-blue-300 transition-colors tracking-tight'>{booking.car.brand} <span className="font-light">{booking.car.model}</span></p>
                <p className='text-blue-400/80 text-xs mt-1 font-semibold tracking-wider uppercase'>{booking.car.year} • {booking.car.category}</p>
              </div>

              {/* Booking Info */}
              <div className='md:col-span-2 z-10 ml-0 md:ml-4'>
                <div className='flex items-center gap-3'>
                  <p className='px-4 py-1.5 bg-white/5 border border-white/10 text-gray-300 font-semibold shadow-inner rounded-full text-[10px] uppercase tracking-widest'>Booking #{index+1}</p>
                  <p className={`px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest rounded-full border shadow-sm ${booking.status === 'confirmed' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' : 'bg-amber-500/20 text-amber-300 border-amber-500/30'}`}>{booking.status}</p>
                </div>

                <div className='flex items-start gap-4 mt-6'>
                  <div className="w-10 h-10 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
                     <img src={assets.calender_icon} alt="" className='w-4 h-4 invert opacity-70'/>
                  </div>
                  <div>
                    <p className='text-blue-400 text-[10px] font-bold uppercase tracking-widest mb-1'>Rental Period</p>
                    <p className="text-gray-200 font-medium text-[13px]">{booking.pickupDate.split('T')[0]} <span className="text-gray-500 font-bold mx-2 block md:inline text-xs mt-1 md:mt-0">TO</span> {booking.returnDate.split('T')[0]}</p>
                  </div>
                </div>

                <div className='flex items-start gap-4 mt-5'>
                  <div className="w-10 h-10 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0">
                     <img src={assets.location_icon} alt="" className='w-4 h-4 invert opacity-70'/>
                  </div>
                  <div>
                    <p className='text-indigo-400 text-[10px] font-bold uppercase tracking-widest mb-1'>Pick-up Location</p>
                    <p className="text-gray-200 font-medium text-[13px]">{booking.car.location}</p>
                  </div>
                </div>
              </div>

             {/* Price */}
             <div className='md:col-span-1 flex flex-col justify-between gap-6 z-10 h-full w-full'>
                <div className='text-sm text-gray-400 text-left md:text-right flex flex-col justify-end h-full w-full pb-2 md:pb-6 pr-0 md:pr-4'>
                  <p className='text-[10px] font-bold uppercase tracking-widest text-gray-500'>Total Price</p>
                  <h1 className='text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 my-2'>{currency}{booking.price}</h1>
                  <p className='text-[11px] text-gray-500 font-medium tracking-wide'>Booked on {booking.createdAt.split('T')[0]}</p>
                </div>
             </div>

            </motion.div>
          ))}
          {bookings.length === 0 && <div className='py-12 text-gray-500 italic text-lg'>No bookings found yet.</div>}
         </div>
      </motion.div>
    </div>
  )
}

export default MyBookings
