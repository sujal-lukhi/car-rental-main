import React, { useEffect, useState } from 'react'
import Title from '../components/Title'
import { assets} from '../assets/assets'
import CarCard from '../components/CarCard'
import { useSearchParams } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'

const Cars = () => {

  // getting search params from url
  const [searchParams] = useSearchParams()
  const pickupLocation = searchParams.get('pickupLocation')
  const pickupDate = searchParams.get('pickupDate')
  const returnDate = searchParams.get('returnDate')

  const {cars, axios} = useAppContext()

  const [input, setInput] = useState('')

  const isSearchData = pickupLocation && pickupDate && returnDate
  const [filteredCars, setFilteredCars] = useState([])
  
  const applyFilter = async ()=>{
     
    if(input === ''){
      setFilteredCars(cars)
      return null
    }

    const filtered = cars.slice().filter((car)=>{
      return car.brand.toLowerCase().includes(input.toLowerCase())
      || car.model.toLowerCase().includes(input.toLowerCase())  
      || car.category.toLowerCase().includes(input.toLowerCase())  
      || car.transmission.toLowerCase().includes(input.toLowerCase())
    })
    setFilteredCars(filtered)
  }

  const searchCarAvailablity = async () =>{
    const {data} = await axios.post('/api/bookings/check-availability', {location: pickupLocation, pickupDate, returnDate})
    if (data.success) {
      setFilteredCars(data.availableCars)
      if(data.availableCars.length === 0){
        toast('No cars available')
      }
      return null
    }
  }

  useEffect(()=>{
    isSearchData && searchCarAvailablity()
  },[])

  useEffect(()=>{
    cars.length > 0 && !isSearchData && applyFilter()
  },[input, cars])

  return (
    <div className="relative min-h-screen bg-[#0B0F19] overflow-hidden pt-24 pb-20">
      
      {/* Background Mesh */}
      <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[150px] -z-10 pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[150px] -z-10 pointer-events-none" />

      <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className='flex flex-col items-center py-16 text-center max-md:px-4 z-10 relative'
      >
        <h1 className='text-4xl md:text-5xl font-extrabold tracking-tight text-white drop-shadow-md'>
          Available <span className='text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400'>Cars</span>
        </h1>
        <p className='text-gray-400 mt-4 max-w-2xl text-lg'>Browse our selection of premium vehicles available for your next adventure</p>

        <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className='flex items-center bg-white/5 backdrop-blur-2xl border border-white/10 px-6 mt-10 max-w-2xl w-full h-16 rounded-full shadow-[0_10px_40px_rgba(0,0,0,0.5)] focus-within:border-white/30 focus-within:shadow-[0_0_25px_rgba(99,102,241,0.2)] transition-all relative overflow-hidden'
        >
          {/* Inner focus glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-indigo-500/0 pointer-events-none"></div>

          <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center mr-3">
             <img src={assets.search_icon} alt="" className='w-4 h-4 invert opacity-70'/>
          </div>

          <input onChange={(e)=> setInput(e.target.value)} value={input} type="text" placeholder='Search by make, model, or features...' className='w-full h-full bg-transparent outline-none text-white font-medium placeholder-gray-500 relative z-10 tracking-wide'/>

          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center ml-3 cursor-pointer shadow-lg hover:shadow-xl transition-shadow">
             <img src={assets.filter_icon} alt="" className='w-4 h-4 invert'/>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className='px-6 md:px-16 lg:px-24 xl:px-32 mt-6 z-10 relative'
      >
        <p className='text-gray-400 font-semibold tracking-widest text-[11px] mb-4 uppercase xl:px-20 max-w-7xl mx-auto'>
           Showing <span className="text-white bg-white/10 px-2 py-0.5 rounded-md">{filteredCars.length}</span> Cars
        </p>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-2 xl:px-20 max-w-7xl mx-auto'>
          {filteredCars.map((car, index)=> (
            <motion.div key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.5 }}
            >
              <CarCard car={car}/>
            </motion.div>
          ))}
        </div>
      </motion.div>

    </div>
  )
}

export default Cars
