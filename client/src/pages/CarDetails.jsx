import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { assets, dummyCarData } from "../assets/assets";
import Loader from "../components/Loader";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const CarDetails = () => {
  const { id } = useParams();

  const { cars, axios, pickupDate, setPickupDate, returnDate, setReturnDate } =
    useAppContext();

  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const currency = import.meta.env.VITE_CURRENCY;

  const handleSubmit = async (e) => {
    e.preventDefault();
            
    try {
      console.log("Booking car:", id, pickupDate, returnDate);
      const { data } = await axios.post("/api/bookings/create", {
        car: id,
        pickupDate,
        returnDate,
      });

      if (data.success) {
        // 🔥 Redirect to Stripe Checkout page
        window.location.href = data.url;
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    setCar(cars.find((car) => car._id === id));
  }, [cars, id]);

  return car ? (
    <div className="relative min-h-screen bg-[#0B0F19] text-gray-200 overflow-hidden pt-28 pb-20">
      
      {/* Immersive Background Lighting */}
      <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-10%] w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="px-6 md:px-16 lg:px-24 xl:px-32 max-w-7xl mx-auto relative z-10">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 mb-8 text-blue-400 hover:text-white transition-colors cursor-pointer font-medium tracking-wide"
        >
          <img src={assets.arrow_icon} alt="" className="rotate-180 opacity-80 invert h-4" />
          Back to all cars
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Left: Car Image & Details */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <motion.div
              initial={{ scale: 0.98, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10 mb-8"
            >
              <img
                src={car.image}
                alt=""
                className="w-full h-auto md:max-h-[500px] object-cover transition-transform duration-700 hover:scale-[1.02]"
              />
              <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0B0F19] to-transparent"></div>
            </motion.div>

            <motion.div
              className="space-y-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <div>
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-2">
                  {car.brand} <span className="font-light text-gray-300">{car.model}</span>
                </h1>
                <p className="text-blue-400 font-semibold uppercase tracking-widest text-sm">
                  {car.category} • {car.year}
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  {
                    icon: assets.users_icon,
                    text: `${car.seating_capacity} Seats`,
                  },
                  { icon: assets.fuel_icon, text: car.fuel_type },
                  { icon: assets.car_icon, text: car.transmission },
                  { icon: assets.location_icon, text: car.location },
                ].map(({ icon, text }) => (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    key={text}
                    className="flex flex-col items-center justify-center p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-sm hover:bg-white/10 transition-colors"
                  >
                    <img src={icon} alt="" className="h-6 mb-3 invert opacity-70" />
                    <span className="text-[13px] font-semibold text-center leading-tight tracking-wide">{text}</span>
                  </motion.div>
                ))}
              </div>

              {/* Description */}
              <div className="bg-white/5 border border-white/5 p-6 md:p-8 rounded-3xl backdrop-blur-sm">
                <h1 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                  <span className="w-8 h-[2px] bg-blue-500"></span>Vehicle Overview
                </h1>
                <p className="text-gray-400 leading-relaxed text-[15px]">{car.description}</p>
              </div>

              {/* Features */}
              <div className="bg-white/5 border border-white/5 p-6 md:p-8 rounded-3xl backdrop-blur-sm">
                <h1 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                  <span className="w-8 h-[2px] bg-indigo-500"></span>Premium Features
                </h1>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-2">
                  {[
                    "360 Camera",
                    "Bluetooth",
                    "GPS",
                    "Heated Seats",
                    "Rear View Mirror",
                  ].map((item) => (
                    <li key={item} className="flex items-center text-gray-300 font-medium">
                      <div className="w-5 h-5 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center mr-3">
                         <img src={assets.check_icon} className="h-2.5 invert" alt="" />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Booking Form Container */}
          <div className="relative h-full">
            <motion.form
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              onSubmit={handleSubmit}
              className="sticky top-28 bg-white/5 border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.6)] backdrop-blur-3xl rounded-[2rem] p-8 space-y-8 text-gray-300 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-[50px] rounded-full pointer-events-none"></div>

              <div>
                <p className="text-sm font-semibold uppercase tracking-widest text-gray-400 mb-1">Rental Rate</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-400">
                    {currency}
                    {car.pricePerDay}
                  </span>
                  <span className="text-[13px] font-medium text-gray-400">/ day</span>
                </div>
              </div>

              <hr className="border-white/10" />

              <div className="space-y-5 relative z-10">
                <div className="flex flex-col gap-2 relative">
                  <label htmlFor="pickup-date" className="text-xs font-bold uppercase tracking-widest text-blue-400 ml-1">Pickup Date</label>
                  <div className="relative">
                    <input
                      value={pickupDate}
                      onChange={(e) => setPickupDate(e.target.value)}
                      type="date"
                      className="w-full bg-white/5 border border-white/10 focus:border-blue-500/50 focus:bg-white/10 px-4 py-3.5 rounded-xl outline-none transition-colors text-white font-medium cursor-pointer"
                      required
                      id="pickup-date"
                      min={new Date().toISOString().split("T")[0]}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2 relative">
                  <label htmlFor="return-date" className="text-xs font-bold uppercase tracking-widest text-indigo-400 ml-1">Return Date</label>
                  <div className="relative">
                    <input
                      value={returnDate}
                      onChange={(e) => setReturnDate(e.target.value)}
                      type="date"
                      className="w-full bg-white/5 border border-white/10 focus:border-indigo-500/50 focus:bg-white/10 px-4 py-3.5 rounded-xl outline-none transition-colors text-white font-medium cursor-pointer"
                      required
                      id="return-date"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-2">
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 transition-all py-4 font-bold tracking-wide text-white rounded-xl shadow-[0_10px_20px_rgba(99,102,241,0.3)] shadow-inner border border-white/10 text-lg cursor-pointer">
                    Book Now
                  </motion.button>
              </div>

              <div className="text-center bg-white/5 py-2.5 rounded-lg border border-white/5">
                <p className="text-xs font-medium text-gray-400">
                  <span className="text-emerald-400 font-bold">✓</span> No credit card required to reserve
                </p>
              </div>
            </motion.form>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Loader />
  );
};

export default CarDetails;
