import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const CarCard = ({car}) => {

    const currency = import.meta.env.VITE_CURRENCY
    const navigate = useNavigate()

  return (
    <div onClick={()=> {navigate(`/car-details/${car._id}`); window.scrollTo(0,0)}} className='group rounded-xl overflow-hidden shadow-lg hover:shadow-[0_8px_30px_rgba(59,130,246,0.15)] hover:-translate-y-2 transition-all duration-500 cursor-pointer bg-light border border-white/5'>
      
      <div className='relative h-48 md:h-56 overflow-hidden'> 
        <img src={car.image} alt="Car Image" className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-110'/>
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-60" />

        {car.isAvaliable && <p className='absolute top-4 left-4 bg-primary/90 text-white text-xs px-3 py-1.5 rounded-full font-medium shadow-md backdrop-blur-sm'>Available Now</p>}

        <div className='absolute bottom-4 right-4 bg-black/50 backdrop-blur-md text-white px-4 py-2 rounded-lg border border-white/10'>
            <span className='font-bold text-lg'>{currency}{car.pricePerDay}</span>
            <span className='text-sm text-gray-300'> / day</span>
        </div>
      </div>

      <div className='p-5 sm:p-6'>
        <div className='flex justify-between items-start mb-2'>
            <div>
                <h3 className='text-xl font-semibold text-white group-hover:text-primary transition-colors'>{car.brand} {car.model}</h3>
                <p className='text-gray-400 text-sm mt-1'>{car.category} • {car.year}</p>
            </div>
        </div>

        <div className='mt-5 grid grid-cols-2 gap-y-3 gap-x-2 text-gray-300'>
            <div className='flex items-center text-sm'>
                <img src={assets.users_icon} alt="" className='h-4 mr-2 invert opacity-70'/>
                <span>{car.seating_capacity} Seats</span>
            </div>
            <div className='flex items-center text-sm'>
                <img src={assets.fuel_icon} alt="" className='h-4 mr-2 invert opacity-70'/>
                <span>{car.fuel_type}</span>
            </div>
            <div className='flex items-center text-sm'>
                <img src={assets.car_icon} alt="" className='h-4 mr-2 invert opacity-70'/>
                <span>{car.transmission}</span>
            </div>
            <div className='flex items-center text-sm'>
                <img src={assets.location_icon} alt="" className='h-4 mr-2 invert opacity-70'/>
                <span>{car.location}</span>
            </div>
        </div>

      </div>

    </div>
  )
}

export default CarCard
