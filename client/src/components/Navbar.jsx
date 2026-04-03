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
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-5 text-gray-400 border-b border-blue-500/20 relative transition-all z-50 backdrop-blur-xl bg-background/80 ${location.pathname === "/" && "fixed top-0 w-full"}`}
    >
      <Link to="/">
        <h1 className="xl:text-3xl font-bold tracking-tight text-white">Smart Urban Mobility</h1>
      </Link>

      <div
        className={`max-sm:fixed max-sm:h-screen max-sm:w-full max-sm:top-[72px] right-0 flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-10 max-sm:p-8 transition-all duration-300 z-40 backdrop-blur-3xl bg-background/95 sm:bg-transparent ${open ? "max-sm:translate-x-0" : "max-sm:translate-x-full"}`}
      >
        {menuLinks.map((link, index) => (
          <Link key={index} to={link.path} className="font-medium hover:text-blue-400 transition-colors duration-300 text-sm tracking-wide relative group">
            {link.name}
            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
          </Link>
        ))}

        <div className="flex max-sm:flex-col items-start sm:items-center gap-6 mt-4 sm:mt-0">
          {isOwner && (
            <button
              onClick={() => navigate("/owner")}
              className="cursor-pointer font-medium hover:text-white transition-colors text-sm tracking-wide"
            >
              Dashboard
            </button>
          )}

          <button
            onClick={() => {
              user ? logout() : setShowLogin(true);
            }}
            className="cursor-pointer px-7 py-2.5 bg-white hover:bg-gray-200 transition-colors duration-300 text-black rounded-lg font-semibold tracking-wide shadow-sm"
          >
            {user ? "Logout" : "Login"}
          </button>
        </div>
      </div>

      <button
        className="sm:hidden cursor-pointer p-2 rounded-md hover:bg-white/10 transition-colors"
        aria-label="Menu"
        onClick={() => setOpen(!open)}
      >
        <img src={open ? assets.close_icon : assets.menu_icon} alt="menu" className="invert opacity-90 w-6" />
      </button>
    </motion.div>
  );
};

export default Navbar;
