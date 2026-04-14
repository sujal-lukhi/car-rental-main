import { useEffect, useState } from 'react'
import { assets } from '../../assets/assets'
import Title from '../../components/owner/Title'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'

import { motion } from 'framer-motion';

const Dashboard = () => {

  const {axios, isOwner, currency} = useAppContext()

  const [data, setData] = useState({
    totalCars: 0,
    totalBookings: 0,
    pendingBookings: 0,
    completedBookings: 0,
    recentBookings: [],
    monthlyRevenue: 0,
  })

  const dashboardCards = [
    {title: "Total Cars", value: data.totalCars, icon: assets.carIconColored, color: "from-blue-500 to-cyan-400"},
    {title: "Total Bookings", value: data.totalBookings, icon: assets.listIconColored, color: "from-purple-500 to-indigo-400"},
    {title: "Pending", value: data.pendingBookings, icon: assets.cautionIconColored, color: "from-amber-500 to-orange-400"},
    {title: "Confirmed", value: data.completedBookings, icon: assets.listIconColored, color: "from-emerald-500 to-teal-400"},
  ]

  const fetchDashboardData = async ()=>{
    try {
       const { data } = await axios.get('/api/owner/dashboard')
       if (data.success){
        setData(data.dashboardData)
       }else{
        toast.error(data.message)
       }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(()=>{
    if(isOwner){
      fetchDashboardData()
    }
  },[isOwner])

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className='px-2 md:px-6 w-full text-white pb-10'>
      
      <div className='mb-8 mt-2'>
        <h1 className='text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 drop-shadow-md'>Overview</h1>
        <p className='text-gray-400 mt-1'>Monitor your platform performance in real-time</p>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className='grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 my-8'>
        {dashboardCards.map((card, index)=>(
          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -5, scale: 1.02 }}
            key={index} 
            className='relative overflow-hidden flex flex-col justify-between p-5 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-2xl shadow-lg'>
            
            {/* Background glow for card */}
            <div className={`absolute -right-10 -top-10 w-32 h-32 bg-gradient-to-br ${card.color} opacity-10 blur-3xl rounded-full`}></div>

            <div className='flex items-center justify-between mb-4 relative z-10'>
              <div className={`flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${card.color} shadow-inner`}>
                <img src={card.icon} alt="" className='h-6 w-6 invert brightness-0 drop-shadow-md'/>
              </div>
            </div>
            
            <div className='relative z-10'>
              <p className='text-3xl font-bold text-white tracking-tight drop-shadow-sm'>{card.value}</p>
              <h1 className='text-sm text-gray-400 mt-1 font-medium'>{card.title}</h1>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 w-full'>
        {/* recent booking  */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className='lg:col-span-2 p-6 border border-white/10 bg-white/5 backdrop-blur-2xl rounded-2xl shadow-lg'>
          
          <div className='flex justify-between items-end mb-6'>
            <div>
              <h1 className='text-xl font-bold text-white drop-shadow-md'>Recent Bookings</h1>
              <p className='text-sm text-gray-400 mt-1'>Latest incoming requests</p>
            </div>
          </div>

          <div className='space-y-4'>
            {data.recentBookings.length === 0 ? (
              <p className='text-gray-400 text-sm italic'>No recent bookings found.</p>
            ) : (
              data.recentBookings.map((booking, index)=>(
                <motion.div 
                  whileHover={{ scale: 1.01, backgroundColor: "rgba(255,255,255,0.08)" }}
                  key={index} 
                  className='p-4 rounded-xl flex items-center justify-between bg-white/5 border border-white/5 transition-all'>

                  <div className='flex items-center gap-4'>
                    <div className='hidden sm:flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-gray-700 to-gray-800 border border-white/10 shadow-inner'>
                      <img src={assets.carIconColored} alt="" className='h-5 w-5 invert brightness-0 opacity-70'/>
                    </div>
                    <div>
                      <p className='text-white font-medium'>{booking.car.brand} {booking.car.model}</p>
                      <p className='text-xs text-gray-400 mt-0.5'>{new Date(booking.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>

                  <div className='flex flex-col items-end gap-1 font-medium'>
                    <p className='text-white font-semibold'>{currency}{booking.price}</p>
                    <p className={`px-2.5 py-1 text-[11px] uppercase tracking-wider rounded-md ${booking.status.toLowerCase() === 'confirmed' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : booking.status.toLowerCase() === 'pending' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'bg-gray-500/20 text-gray-300 border border-gray-500/30'}`}>
                      {booking.status}
                    </p>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </motion.div>

        {/* monthly revenue */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className='relative overflow-hidden p-6 border border-white/10 bg-gradient-to-b from-blue-900/40 to-indigo-900/40 backdrop-blur-2xl rounded-2xl shadow-lg flex flex-col justify-center'>
          
          <div className='absolute -right-20 -bottom-20 w-64 h-64 bg-blue-500/20 blur-[80px] rounded-full pointer-events-none'></div>

          <div className='relative z-10'>
            <div className='w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center mb-6 shadow-inner'>
              <span className='text-2xl text-blue-300'>$</span>
            </div>
            <h1 className='text-xl font-bold text-white drop-shadow-md'>Monthly Revenue</h1>
            <p className='text-sm text-gray-400 mt-1'>Earnings for current month</p>
            <div className='mt-8 flex items-baseline gap-1'>
              <span className='text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-indigo-300 drop-shadow-md'>{currency}{data.monthlyRevenue}</span>
            </div>
          </div>
        </motion.div>
        
      </div>
    </motion.div>
  )
}

export default Dashboard
