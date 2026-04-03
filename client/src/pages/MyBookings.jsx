import React, { useEffect, useState } from 'react'
import { assets} from '../assets/assets'
import Title from '../components/Title'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'
import { motion } from 'motion/react'

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
    <motion.div 
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    
    className='px-6 md:px-16 lg:px-24 xl:px-32 2xl:px-48 mt-16 text-sm max-w-7xl'>

      <Title title='My Bookings'
       subTitle='View and manage your all car bookings'
       align="left"/>

       <div>
        {bookings.map((booking, index)=>(
          <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.4 }}
          
          key={booking._id} className='grid grid-cols-1 md:grid-cols-4 gap-6 p-6 border border-white/5 bg-white/5 backdrop-blur-md rounded-2xl shadow-lg hover:border-white/20 hover:shadow-xl transition-all duration-300 mt-5 first:mt-12 relative overflow-hidden group'>
            {/* Background Glow inside Card Removed */}
            <div className='md:col-span-1 z-10'>
              <div className='rounded-xl overflow-hidden mb-3 border border-white/10'>
                <img src={booking.car.image} alt="" className='w-full h-auto aspect-video object-cover transition-transform duration-500 group-hover:scale-105'/>
              </div>
              <p className='text-lg font-bold mt-2 text-white group-hover:text-gray-200 transition-colors'>{booking.car.brand} {booking.car.model}</p>

              <p className='text-gray-400 text-sm mt-1'>{booking.car.year} • {booking.car.category} • {booking.car.location}</p>
            </div>

            {/* Booking Info */}
            <div className='md:col-span-2 z-10'>
              <div className='flex items-center gap-3'>
                <p className='px-4 py-1.5 bg-white/10 border border-white/20 text-white font-medium shadow-sm rounded-full text-xs uppercase tracking-wide'>Booking #{index+1}</p>
                <p className={`px-4 py-1.5 text-xs font-bold uppercase tracking-wide rounded-full border shadow-sm ${booking.status === 'confirmed' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' : 'bg-red-500/10 text-red-400 border-red-500/30'}`}>{booking.status}</p>
              </div>

              <div className='flex items-start gap-3 mt-5'>
                <div className="p-1.5 bg-white/5 border border-white/10 rounded-md">
                   <img src={assets.calendar_icon_colored} alt="" className='w-4 h-4 invert opacity-70'/>
                </div>
                <div>
                  <p className='text-gray-400 text-xs font-semibold uppercase tracking-wider mb-0.5'>Rental Period</p>
                  <p className="text-gray-200">{booking.pickupDate.split('T')[0]} <span className="text-gray-500 font-medium mx-1">TO</span> {booking.returnDate.split('T')[0]}</p>
                </div>
              </div>

              <div className='flex items-start gap-3 mt-4'>
                <div className="p-1.5 bg-white/5 border border-white/10 rounded-md">
                   <img src={assets.location_icon_colored} alt="" className='w-4 h-4 invert opacity-70'/>
                </div>
                <div>
                  <p className='text-gray-400 text-xs font-semibold uppercase tracking-wider mb-0.5'>Pick-up Location</p>
                  <p className="text-gray-200">{booking.car.location}</p>
                </div>
              </div>
            </div>

           {/* Price */}
           <div className='md:col-span-1 flex flex-col justify-between gap-6 z-10'>
              <div className='text-sm text-gray-400 text-right'>
                <p className='text-xs font-semibold uppercase tracking-wider text-gray-500'>Total Price</p>
                <h1 className='text-3xl font-extrabold text-white my-1'>{currency}{booking.price}</h1>
                <p className='text-xs opacity-70'>Booked on {booking.createdAt.split('T')[0]}</p>
              </div>
           </div>


          </motion.div>
        ))}
       </div>
      
    </motion.div>
  )
}

export default MyBookings
