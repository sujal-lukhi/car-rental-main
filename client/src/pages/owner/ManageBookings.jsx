import React, { useEffect, useState } from 'react'
import Title from '../../components/owner/Title'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'

import { motion } from 'framer-motion';

const ManageBookings = () => {

  const { currency, axios } = useAppContext()

  const [bookings, setBookings] = useState([])

  const fetchOwnerBookings = async ()=>{
    try {
      const { data } = await axios.get('/api/bookings/owner')
      data.success ? setBookings(data.bookings) : toast.error(data.message)
    } catch (error) {
      toast.error(error.message)
    }
  }

  const changeBookingStatus = async (bookingId, status)=>{
    try {
      const { data } = await axios.post('/api/bookings/change-status', {bookingId, status})
      if(data.success){
        toast.success(data.message)
        fetchOwnerBookings()
      }else{
        toast.error(data.message)
      }
      
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(()=>{
    fetchOwnerBookings()
  },[])

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className='px-2 md:px-6 w-full text-white pb-10'>
      
      <div className='mb-8 mt-2'>
        <h1 className='text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 drop-shadow-md'>Manage Bookings</h1>
        <p className='text-gray-400 mt-1'>Track customer orders and update statuses</p>
      </div>

      <div className='w-full rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-2xl shadow-xl mt-6 pb-2 relative'>
        <div className='absolute bottom-0 left-1/4 w-96 h-96 bg-purple-500/5 blur-[100px] pointer-events-none rounded-full'></div>
        
        <div className='overflow-x-auto relative z-10'>
          <table className='w-full border-collapse text-left text-sm text-gray-300'>
            <thead className='text-gray-400 border-b border-white/10 bg-black/20 backdrop-blur-sm shadow-sm'>
              <tr>
                <th className="p-5 font-medium tracking-wider uppercase text-xs">Car</th>
                <th className="p-5 font-medium tracking-wider uppercase text-xs max-md:hidden">Date Range</th>
                <th className="p-5 font-medium tracking-wider uppercase text-xs">Total</th>
                <th className="p-5 font-medium tracking-wider uppercase text-xs max-md:hidden">Payment</th>
                <th className="p-5 font-medium tracking-wider uppercase text-xs text-right pr-8">Actions</th>
              </tr>
            </thead>
            <motion.tbody variants={containerVariants} initial="hidden" animate="show">
              {bookings.map((booking, index)=>(
                <motion.tr variants={itemVariants} whileHover={{ backgroundColor: "rgba(255,255,255,0.03)" }} key={index} className='border-b border-white/5 transition-colors'>

                  <td className='p-4 px-5 flex items-center gap-4'>
                    <img src={booking.car.image} alt="" className='h-14 w-14 aspect-square rounded-xl object-cover border border-white/10 shadow-sm'/>
                    <p className='font-semibold text-white max-md:hidden tracking-wide'>{booking.car.brand} {booking.car.model}</p>
                  </td>

                  <td className='p-5 max-md:hidden font-mono text-xs text-gray-400'>
                    <span className='text-gray-300'>{booking.pickupDate.split('T')[0]}</span> <br/>
                    <span className='opacity-50 text-[10px]'>→</span> <span className='text-gray-300'>{booking.returnDate.split('T')[0]}</span>
                  </td>

                  <td className='p-5 font-semibold text-white'>{currency}{booking.price}</td>

                  <td className='p-5 max-md:hidden'>
                    <span className='bg-white/5 border border-white/10 px-3 py-1.5 rounded-md text-[11px] uppercase tracking-widest text-gray-300 shadow-inner'>Online</span>
                  </td>

                  <td className='p-5'>
                    <div className='flex items-center justify-end pr-2'>
                      {booking.status === 'pending' ? (
                        <select onChange={e=> changeBookingStatus(booking._id, e.target.value)} value={booking.status} className='px-4 py-2 text-xs font-semibold uppercase tracking-wider text-amber-200 bg-amber-500/10 border border-amber-500/30 rounded-lg outline-none cursor-pointer focus:ring-2 focus:ring-amber-500/50 appearance-none shadow-[0_0_10px_rgba(245,158,11,0.1)] transition-shadow'>
                          <option value="pending" className="bg-[#0f172a] text-amber-300">⏳ Pending</option>
                          <option value="cancelled" className="bg-[#0f172a] text-red-300">❌ Cancelled</option>
                          <option value="confirmed" className="bg-[#0f172a] text-emerald-300">✅ Confirmed</option>
                        </select>
                      ): (
                        <span className={`px-4 py-2 rounded-lg text-[11px] font-semibold uppercase tracking-wider border shadow-sm ${booking.status === 'confirmed' ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30 shadow-[0_0_10px_rgba(16,185,129,0.15)]' : 'bg-red-500/10 text-red-300 border-red-500/30'}`}>
                          {booking.status}
                        </span>
                      )}
                    </div>
                  </td>

                </motion.tr>
              ))}
            </motion.tbody>
          </table>
          {bookings.length === 0 && <div className='py-12 text-center text-gray-500 italic'>No bookings found yet.</div>}
        </div>

      </div>

    </motion.div>
  )
}

export default ManageBookings
