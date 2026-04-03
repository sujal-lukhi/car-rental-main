import React, { useState, useEffect } from 'react'
import { assets, cityList } from '../assets/assets'
import { useAppContext } from '../context/AppContext'
import { motion, AnimatePresence } from 'motion/react'

const Hero = () => {

    const [pickupLocation, setPickupLocation] = useState('')
    const [carIndex, setCarIndex] = useState(0)

    const {pickupDate, setPickupDate, returnDate, setReturnDate, navigate} = useAppContext()

    // The 1 car already there + the 4 additional cars
    const carImages = [
        assets.sp4, 
        assets.car_image1, 
        assets.car_image2, 
        assets.car_image3, 
        assets.car_image4
    ]

    useEffect(() => {
        // Swap to the next car every 4.5 seconds
        const timer = setInterval(() => {
            setCarIndex((prev) => (prev + 1) % carImages.length);
        }, 4500);
        return () => clearInterval(timer);
    }, [carImages.length]);

    const handleSearch = (e)=>{
        e.preventDefault()
        navigate('/cars?pickupLocation=' + pickupLocation + '&pickupDate=' + pickupDate + '&returnDate=' + returnDate)
    }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      style={{ perspective: 1200 }}
      className='min-h-screen flex flex-col items-center justify-center gap-10 bg-background text-center pt-24 relative overflow-hidden z-0'
    >
      {/* Subtle atmospheric lighting */}
      <div className="absolute top-1/4 left-[10%] w-72 md:w-[500px] h-72 md:h-[500px] bg-white/5 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-1/4 right-[10%] w-72 md:w-[400px] h-72 md:h-[400px] bg-white/5 rounded-full blur-[100px] -z-10" />

      <motion.form
        initial={{ scale: 0.95, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        onSubmit={handleSearch} 
        className='flex flex-col md:flex-row items-start md:items-center justify-between p-6 w-[90%] md:w-full max-w-80 md:max-w-200 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.3)] z-10'
      >
        <div className='flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-10 min-md:ml-8 w-full'>
            <div className='flex flex-col items-start gap-2 w-full'>
                <p className='text-xs text-gray-400 mb-[-4px] font-medium uppercase tracking-wider'>Location</p>
                <select required value={pickupLocation} onChange={(e)=>setPickupLocation(e.target.value)} className='bg-transparent border-b border-white/20 text-white font-semibold text-lg focus:outline-none focus:border-white pb-2 w-full appearance-none cursor-pointer transition-colors'>
                    <option value="" className='bg-background text-gray-400 font-normal'>Select Location</option>
                    {cityList.map((city)=> <option key={city} value={city} className='bg-background text-white font-normal'>{city}</option>)}
                </select>
            </div>
            <div className='flex flex-col items-start gap-2 w-full'>
                <label htmlFor='pickup-date' className='text-xs text-gray-400 mb-[-4px] font-medium uppercase tracking-wider'>Pick-up Date</label>
                <input value={pickupDate} onChange={e=>setPickupDate(e.target.value)} type="date" id="pickup-date" min={new Date().toISOString().split('T')[0]} className='bg-transparent border-b border-white/20 text-white font-semibold text-lg focus:outline-none focus:border-white pb-2 w-full cursor-pointer transition-colors' required/>
            </div>
            <div className='flex flex-col items-start gap-2 w-full'>
                <label htmlFor='return-date' className='text-xs text-gray-400 mb-[-4px] font-medium uppercase tracking-wider'>Return Date</label>
                <input value={returnDate} onChange={e=>setReturnDate(e.target.value)} type="date" id="return-date" className='bg-transparent border-b border-white/20 text-white font-semibold text-lg focus:outline-none focus:border-white pb-2 w-full cursor-pointer transition-colors' required/>
            </div>
        </div>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className='flex items-center justify-center gap-2 px-8 py-3.5 max-sm:mt-8 bg-white hover:bg-gray-200 text-black rounded-full cursor-pointer shadow-md transition-colors font-bold tracking-wide md:min-w-[140px]'
        >
          <img src={assets.search_icon} alt="search" className='w-5 mix-blend-difference'/>
          Search
        </motion.button>
      </motion.form>

      <motion.h1 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className='text-4xl md:text-6xl font-bold tracking-tight text-white mt-4 drop-shadow-md z-10 relative'
      >
        Premium Fleet On-Demand
      </motion.h1>
      
      <div className="relative z-10 mt-6 flex flex-col items-center justify-center h-[300px] md:h-[450px] w-full">
        {/* Continuously Swapping Rotating Car Images */}
        <AnimatePresence mode="wait">
            <motion.img
                key={carIndex}
                src={carImages[carIndex]} 
                alt="3D Rotating Car" 
                className='absolute max-h-[300px] md:max-h-[450px] object-contain drop-shadow-[0_25px_25px_rgba(0,0,0,0.8)] w-auto pointer-events-none'
                initial={{ rotateY: -90, opacity: 0, scale: 0.9 }}
                animate={{ rotateY: 0, opacity: 1, scale: 1 }}
                exit={{ rotateY: 90, opacity: 0, scale: 0.9 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
                style={{ transformStyle: "preserve-3d" }}
            />
        </AnimatePresence>
        
        {/* Platform Shadow pulsating continuously */}
        <motion.div 
            animate={{ scale: [1, 0.95, 1], opacity: [0.6, 0.4, 0.6] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-0 w-[60%] md:w-[700px] h-[30px] bg-black/80 rounded-[100%] blur-xl pointer-events-none"
            style={{ transform: "translateY(50px)" }}
        />
      </div>

    </motion.div>
  )
}

export default Hero
