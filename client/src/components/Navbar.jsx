import React, { useState } from "react";
import { assets, menuLinks } from "../assets/assets";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { motion } from "motion/react";

const Navbar = () => {
  const { setShowLogin, user, logout, isOwner } = useAppContext();

  const location = useLocation();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className={`w-full flex justify-center z-50 pointer-events-none transition-all ${location.pathname === "/" ? "absolute top-0 pt-6 px-4" : "sticky top-0 pt-4 px-4 bg-background/50 backdrop-blur-sm pb-4"}`}>
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-7xl flex items-center justify-between px-6 lg:px-8 py-3.5 text-gray-400 border border-white/10 rounded-full shadow-2xl shadow-black/40 backdrop-blur-2xl bg-white/5 pointer-events-auto"
      >
        <Link to="/">
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 drop-shadow-md">Smart Urban Mobility</h1>
        </Link>

        <div
          className={`max-sm:absolute max-sm:top-[70px] max-sm:right-4 max-sm:rounded-2xl max-sm:border max-sm:border-white/10 flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-10 max-sm:p-6 transition-all duration-300 max-sm:backdrop-blur-3xl max-sm:bg-[#0f172a]/95 max-sm:shadow-2xl ${open ? "max-sm:opacity-100 max-sm:visible max-sm:scale-100" : "max-sm:opacity-0 max-sm:hidden max-sm:scale-95"}`}
        >
          {menuLinks.map((link, index) => (
            <Link key={index} to={link.path} className="font-medium hover:text-white transition-colors duration-300 text-sm tracking-wide relative group">
              {link.name}
              <span className="absolute -bottom-1.5 left-0 w-0 h-[2px] bg-gradient-to-r from-blue-400 to-indigo-400 transition-all duration-300 group-hover:w-full rounded-full shadow-[0_0_8px_rgba(96,165,250,0.8)]"></span>
            </Link>
          ))}

          <div className="flex max-sm:flex-col items-start sm:items-center gap-4 sm:ml-4">
            {isOwner && (
              <button
                onClick={() => navigate("/owner")}
                className="cursor-pointer font-medium text-blue-300 hover:text-white transition-colors text-sm tracking-wide"
              >
                Dashboard
              </button>
            )}

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                user ? logout() : setShowLogin(true);
              }}
              className="cursor-pointer px-6 py-2 bg-gradient-to-r from-white to-gray-200 hover:from-white hover:to-white transition-colors duration-300 text-black rounded-full font-bold tracking-wide shadow-[0_0_15px_rgba(255,255,255,0.2)] text-sm"
            >
              {user ? "Logout" : "Login"}
            </motion.button>
          </div>
        </div>

        <button
          className="sm:hidden cursor-pointer p-2 rounded-full hover:bg-white/10 transition-colors"
          aria-label="Menu"
          onClick={() => setOpen(!open)}
        >
          <img src={open ? assets.close_icon : assets.menu_icon} alt="menu" className="invert opacity-90 w-5 h-5 object-contain" />
        </button>
      </motion.div>
    </div>
  );
};

export default Navbar;
