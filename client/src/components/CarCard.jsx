import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const CarCard = ({car}) => {

    const currency = import.meta.env.VITE_CURRENCY
    const navigate = useNavigate()

  return (
    <div onClick={()=> {navigate(`/car-details/${car._id}`); window.scrollTo(0,0)}} className='group rounded-2xl overflow-hidden shadow-lg hover:shadow-[0_0_30px_rgba(99,102,241,0.15)] hover:-translate-y-2 transition-all duration-500 cursor-pointer bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 relative'>
      
      {/* Subtle Inner Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

      <div className='relative h-48 md:h-56 overflow-hidden p-2'> 
        <img src={car.image} alt="Car Image" className='w-full h-full object-cover rounded-xl transition-transform duration-700 group-hover:scale-[1.03]'/>
        <div className="absolute inset-2 bg-gradient-to-t from-[#0B0F19]/90 to-transparent opacity-80" />

        {car.isAvaliable && <p className='absolute top-5 left-5 bg-emerald-500/80 text-emerald-100 text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-full font-bold shadow-md backdrop-blur-md border border-emerald-400/50'>Available Now</p>}

        <div className='absolute bottom-5 right-5 bg-white/10 backdrop-blur-md text-white px-4 py-1.5 rounded-xl border border-white/20 shadow-inner group-hover:bg-blue-500/20 group-hover:border-blue-400/30 transition-all'>
            <span className='font-extrabold text-xl'>{currency}{car.pricePerDay}</span>
            <span className='text-xs text-gray-300 font-medium tracking-wide'>/day</span>
        </div>
      </div>

      <div className='p-6 pt-4'>
        <div className='flex justify-between items-start mb-4'>
            <div>
                <h3 className='text-2xl font-bold text-white group-hover:text-blue-400 transition-colors drop-shadow-sm tracking-tight'>{car.brand} <span className="font-medium text-gray-200">{car.model}</span></h3>
                <p className='text-blue-400/80 text-xs mt-1 font-semibold tracking-wider uppercase'>{car.category} • {car.year}</p>
            </div>
        </div>

        <div className='mt-2 grid grid-cols-2 gap-y-4 gap-x-2 text-gray-300 border-t border-white/10 pt-5'>
            <div className='flex items-center text-[13px] font-medium'>
                <div className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center mr-2 border border-white/5 group-hover:border-blue-500/30 transition-colors">
                  <img src={assets.users_icon} alt="" className='h-3.5 invert opacity-70'/>
                </div>
                <span>{car.seating_capacity} Seats</span>
            </div>
            <div className='flex items-center text-[13px] font-medium'>
                <div className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center mr-2 border border-white/5 group-hover:border-blue-500/30 transition-colors">
                  <img src={assets.fuel_icon} alt="" className='h-3.5 invert opacity-70'/>
                </div>
                <span>{car.fuel_type}</span>
            </div>
            <div className='flex items-center text-[13px] font-medium'>
                <div className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center mr-2 border border-white/5 group-hover:border-blue-500/30 transition-colors">
                  <img src={assets.car_icon} alt="" className='h-3.5 invert opacity-70'/>
                </div>
                <span>{car.transmission}</span>
            </div>
            <div className='flex items-center text-[13px] font-medium'>
                <div className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center mr-2 border border-white/5 group-hover:border-blue-500/30 transition-colors">
                  <img src={assets.location_icon} alt="" className='h-3.5 invert opacity-70'/>
                </div>
                <span className="truncate pr-2">{car.location}</span>
            </div>
        </div>

      </div>

    </div>
  )
}

export default CarCard
