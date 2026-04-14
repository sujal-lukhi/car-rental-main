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
      className='min-h-screen flex flex-col items-center justify-center gap-10 bg-[#0B0F19] text-center pt-28 pb-10 relative overflow-hidden z-0'
    >
      {/* Intense atmospheric lighting */}
      <div className="absolute top-[15%] left-[5%] w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-blue-500/10 rounded-full blur-[150px] -z-10 pointer-events-none" />
      <div className="absolute bottom-1/4 right-[5%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-indigo-500/10 rounded-full blur-[150px] -z-10 pointer-events-none" />

      <motion.form
        initial={{ scale: 0.95, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        onSubmit={handleSearch} 
        className='flex flex-col md:flex-row items-center justify-between p-6 md:p-4 px-6 md:px-8 w-[95%] max-w-5xl bg-white/5 backdrop-blur-2xl border border-white/10 hover:border-white/20 transition-colors rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-10'
      >
        <div className='flex flex-col md:flex-row items-center w-full gap-5 md:gap-8'>
            
            <div className='flex items-center gap-4 w-full bg-white/5 md:bg-transparent p-4 md:p-0 rounded-2xl border border-white/5 md:border-none focus-within:bg-white/10 transition-colors'>
                <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-500/30">
                  <img src={assets.location_icon} alt="location" className="w-4 h-4 invert opacity-80" />
                </div>
                <div className='flex flex-col items-start w-full focus-within:text-white'>
                    <select required value={pickupLocation} onChange={(e)=>setPickupLocation(e.target.value)} className='bg-transparent text-gray-200 font-semibold text-lg focus:outline-none w-full appearance-none cursor-pointer transition-colors'>
                        <option value="" className='bg-[#0B0F19] text-gray-400 font-normal'>Any Location</option>
                        {cityList.map((city)=> <option key={city} value={city} className='bg-[#0B0F19] text-white font-normal'>{city}</option>)}
                    </select>
                    <p className='text-[10px] text-blue-400 font-bold uppercase tracking-widest mt-1'>Pick-up Area</p>
                </div>
            </div>

            <div className="hidden md:block w-[1px] h-12 bg-white/10"></div>

            <div className='flex items-center gap-4 w-full bg-white/5 md:bg-transparent p-4 md:p-0 rounded-2xl border border-white/5 md:border-none focus-within:bg-white/10 transition-colors'>
                 <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-500/30">
                  <img src={assets.calendar_icon_colored} alt="date" className="w-4 h-4 invert grayscale opacity-80" />
                </div>
                <div className='flex flex-col items-start w-full relative'>
                    <input value={pickupDate} onChange={e=>setPickupDate(e.target.value)} type="date" id="pickup-date" min={new Date().toISOString().split('T')[0]} className='bg-transparent text-gray-200 font-semibold text-lg focus:outline-none w-full cursor-pointer transition-colors' required/>
                    <label htmlFor='pickup-date' className='text-[10px] text-blue-400 font-bold uppercase tracking-widest mt-1'>Pick-up Date</label>
                </div>
            </div>

            <div className="hidden md:block w-[1px] h-12 bg-white/10"></div>

            <div className='flex items-center gap-4 w-full bg-white/5 md:bg-transparent p-4 md:p-0 rounded-2xl border border-white/5 md:border-none focus-within:bg-white/10 transition-colors'>
                 <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center border border-indigo-500/30">
                  <img src={assets.calendar_icon_colored} alt="date" className="w-4 h-4 invert grayscale opacity-80" />
                </div>
                <div className='flex flex-col items-start w-full relative'>
                    <input value={returnDate} onChange={e=>setReturnDate(e.target.value)} type="date" id="return-date" className='bg-transparent text-gray-200 font-semibold text-lg focus:outline-none w-full cursor-pointer transition-colors' required/>
                    <label htmlFor='return-date' className='text-[10px] text-indigo-400 font-bold uppercase tracking-widest mt-1'>Return Date</label>
                </div>
            </div>
            
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className='flex items-center justify-center gap-2 p-4 md:py-3.5 md:px-8 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-400 hover:to-indigo-400 text-white rounded-xl md:rounded-full cursor-pointer shadow-[0_0_20px_rgba(99,102,241,0.4)] transition-all font-bold tracking-wide w-full md:w-auto h-full'
            >
              <img src={assets.search_icon} alt="search" className='w-5 invert opacity-90'/>
              <span>Search Vehicles</span>
            </motion.button>
        </div>
      </motion.form>

      <motion.div 
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className='mt-6 z-10 relative flex flex-col items-center'
      >
        <div className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-4 backdrop-blur-md">
            <p className="text-xs font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 uppercase">The Future of Rentals</p>
        </div>
        <h1 className='text-5xl md:text-7xl font-bold tracking-tight text-white drop-shadow-xl'>
          Premium Fleet <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">On-Demand</span>
        </h1>
      </motion.div>
      
      <div className="relative z-10 mt-2 flex flex-col items-center justify-center h-[300px] md:h-[450px] w-full">
        {/* Continuously Swapping Rotating Car Images */}
        <AnimatePresence mode="wait">
            <motion.img
                key={carIndex}
                src={carImages[carIndex]} 
                alt="3D Rotating Car" 
                className='absolute max-h-[250px] md:max-h-[400px] object-contain drop-shadow-[0_35px_35px_rgba(0,0,0,0.8)] w-auto pointer-events-none'
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
            className="absolute bottom-6 md:bottom-10 w-[60%] md:w-[700px] h-[30px] bg-blue-900/60 rounded-[100%] blur-[30px] pointer-events-none"
            style={{ transform: "translateY(50px)" }}
        />
      </div>

    </motion.div>
  )
}

export default Hero
