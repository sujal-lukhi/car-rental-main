import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { useAppContext } from '../context/AppContext';

const BookingSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { axios } = useAppContext();

  useEffect(() => {
    // Verify payment and update status locally
    const bookingId = searchParams.get('bookingId');
    if (bookingId) {
      axios.post('/api/bookings/verify-payment', { bookingId })
        .then(res => console.log(res.data))
        .catch(err => console.log(err));
    }

    // Play a success sound like "PhonePe" transaction notification
    // We use a high-quality positive notification chime
    const audio = new Audio("https://cdn.freesound.org/previews/511/511484_6890478-lq.mp3");
    
    // Play the audio. Some browsers require user interaction, but since they just 
    // returned from a payment gateway, it usually counts as active interaction.
    audio.play().catch((err) => console.log('Audio playback prevented by browser policy', err));

    // Redirect to my bookings after 4 seconds
    const timer = setTimeout(() => {
      navigate('/my-bookings');
    }, 4000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen pt-24 bg-gradient-to-br from-[#0a0a0a] to-[#111] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 150 }}
          className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </motion.div>
        
        <h2 className="text-3xl font-bold text-white mb-2">Payment Successful!</h2>
        <p className="text-gray-400 mb-8">
          Your car booking has been confirmed. You are being redirected to your bookings...
        </p>
        
        <button 
          onClick={() => navigate('/my-bookings')}
          className="w-full py-3 px-4 bg-white text-black font-semibold rounded-xl hover:bg-gray-200 transition-colors"
        >
          View Bookings Now
        </button>
      </motion.div>
    </div>
  );
};

export default BookingSuccess;
