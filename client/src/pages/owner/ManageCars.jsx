import React, { useEffect, useState } from 'react'
import { assets} from '../../assets/assets'
import Title from '../../components/owner/Title'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'

import { motion } from 'framer-motion';

const ManageCars = () => {

  const {isOwner, axios, currency} = useAppContext()

  const [cars, setCars] = useState([])

  const fetchOwnerCars = async ()=>{
    try {
      const {data} = await axios.get('/api/owner/cars')
      if(data.success){
        setCars(data.cars)
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const toggleAvailability = async (carId)=>{
    try {
      const {data} = await axios.post('/api/owner/toggle-car', {carId})
      if(data.success){
        toast.success(data.message)
        fetchOwnerCars()
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const deleteCar = async (carId)=>{
    try {

      const confirm = window.confirm('Are you sure you want to delete this car?')

      if(!confirm) return null

      const {data} = await axios.post('/api/owner/delete-car', {carId})
      if(data.success){
        toast.success(data.message)
        fetchOwnerCars()
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(()=>{
    isOwner && fetchOwnerCars()
  },[isOwner])

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
        <h1 className='text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 drop-shadow-md'>Manage Cars</h1>
        <p className='text-gray-400 mt-1'>View and modify your listed fleet</p>
      </div>

      <div className='w-full rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-2xl shadow-xl mt-6 pb-2 relative'>
        <div className='absolute top-0 right-1/4 w-96 h-96 bg-blue-500/5 blur-[100px] pointer-events-none rounded-full'></div>
        
        <div className='overflow-x-auto relative z-10'>
          <table className='w-full border-collapse text-left text-sm text-gray-300'>
            <thead className='text-gray-400 border-b border-white/10 bg-black/20 backdrop-blur-sm shadow-sm'>
              <tr>
                <th className="p-5 font-medium tracking-wider uppercase text-xs">Car</th>
                <th className="p-5 font-medium tracking-wider uppercase text-xs max-md:hidden">Category</th>
                <th className="p-5 font-medium tracking-wider uppercase text-xs">Price</th>
                <th className="p-5 font-medium tracking-wider uppercase text-xs max-md:hidden">Status</th>
                <th className="p-5 font-medium tracking-wider uppercase text-xs text-right pr-8">Actions</th>
              </tr>
            </thead>
            <motion.tbody variants={containerVariants} initial="hidden" animate="show">
              {cars.map((car, index)=>(
                <motion.tr variants={itemVariants} whileHover={{ backgroundColor: "rgba(255,255,255,0.03)" }} key={index} className='border-b border-white/5 transition-colors'>

                  <td className='p-4 px-5 flex items-center gap-4'>
                    <img src={car.image} alt="" className="h-14 w-14 aspect-square rounded-xl object-cover border border-white/10 shadow-sm"/>
                    <div className='max-md:hidden'>
                      <p className='font-semibold text-white tracking-wide'>{car.brand} {car.model}</p>
                      <p className='text-xs text-gray-400 mt-0.5'>{car.seating_capacity} Seats • {car.transmission}</p>
                    </div>
                  </td>

                  <td className='p-5 max-md:hidden font-medium text-gray-300'>{car.category}</td>
                  <td className='p-5 font-semibold text-white'>{currency}{car.pricePerDay}<span className='text-xs text-gray-500 font-normal'>/day</span></td>

                  <td className='p-5 max-md:hidden'>
                    <span className={`px-3 py-1.5 rounded-md text-[11px] uppercase tracking-wider font-semibold border ${car.isAvaliable ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30 shadow-[0_0_10px_rgba(16,185,129,0.2)]' : 'bg-red-500/20 text-red-300 border-red-500/30'}`}>
                      {car.isAvaliable ? "Available" : "Unavailable" }
                    </span>
                  </td>

                  <td className='p-5'>
                     <div className='flex items-center justify-end gap-3 pr-2'>
                        <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={()=> toggleAvailability(car._id)} className='p-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors tooltip' title='Toggle Availability'>
                          <img src={car.isAvaliable ? assets.eye_close_icon : assets.eye_icon} alt="" className='w-4 h-4 invert opacity-70'/>
                        </motion.button>

                        <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={()=> deleteCar(car._id)} className='p-2 bg-red-500/10 border border-red-500/30 rounded-lg hover:bg-red-500/20 transition-colors tooltip' title='Delete Car'>
                          <img src={assets.delete_icon} alt="" className='w-4 h-4 invert opacity-70'/>
                        </motion.button>
                     </div>
                  </td>

                </motion.tr>
              ))}
            </motion.tbody>
          </table>
          {cars.length === 0 && <div className='py-12 text-center text-gray-500 italic'>No cars added yet. Add your first car!</div>}
        </div>
      </div>

    </motion.div>
  )
}

export default ManageCars
