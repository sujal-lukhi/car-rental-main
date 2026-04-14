import React from "react";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

const Login = () => {
  const { setShowLogin, axios, setToken, navigate } = useAppContext();

  const [state, setState] = React.useState("login");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const onSubmitHandler = async (event) => {
    try {
      event.preventDefault();
      const { data } = await axios.post(`/api/user/${state}`, {
        name,
        email,
        password,
      });

      if (data.success) {
        navigate("/");
        setToken(data.token);
        localStorage.setItem("token", data.token);
        setShowLogin(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0B0F19]/80 backdrop-blur-md"
      >
        {/* Click-away backdrop */}
        <div className="absolute inset-0" onClick={() => setShowLogin(false)}></div>

        <motion.form
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.3 }}
          onSubmit={onSubmitHandler}
          onClick={(e) => e.stopPropagation()}
          className="relative flex flex-col gap-5 p-8 w-[90%] sm:w-[400px] rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 bg-white/5 backdrop-blur-3xl overflow-hidden z-10"
        >
          {/* Glow Effects */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 blur-[50px] rounded-full pointer-events-none -z-10"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-500/20 blur-[50px] rounded-full pointer-events-none -z-10"></div>

          <div className="text-center mb-2">
              <h2 className="text-3xl font-extrabold tracking-tight text-white mb-2 relative inline-flex flex-col items-center">
                  {state === "login" ? "Welcome Back" : "Create Account"}
                  <span className="w-12 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mt-2"></span>
              </h2>
              <p className="text-gray-400 text-sm mt-3">
                  {state === "login" ? "Enter your details to access your account." : "Sign up to unlock premium car rentals."}
              </p>
          </div>

          <div className="space-y-4">
              {state === "register" && (
              <div className="w-full">
                  <label className="text-xs font-bold uppercase tracking-widest text-blue-400 ml-1">Name</label>
                  <input
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  placeholder="John Doe"
                  className="w-full bg-white/5 border border-white/10 focus:border-blue-500/50 focus:bg-white/10 px-4 py-3 rounded-xl outline-none transition-colors text-white font-medium mt-1 placeholder-white/20"
                  type="text"
                  required
                  />
              </div>
              )}
              
              <div className="w-full">
              <label className="text-xs font-bold uppercase tracking-widest text-blue-400 ml-1">Email</label>
              <input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  placeholder="you@example.com"
                  className="w-full bg-white/5 border border-white/10 focus:border-blue-500/50 focus:bg-white/10 px-4 py-3 rounded-xl outline-none transition-colors text-white font-medium mt-1 placeholder-white/20"
                  type="email"
                  required
              />
              </div>

              <div className="w-full">
              <label className="text-xs font-bold uppercase tracking-widest text-blue-400 ml-1">Password</label>
              <input
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 focus:border-blue-500/50 focus:bg-white/10 px-4 py-3 rounded-xl outline-none transition-colors text-white font-medium mt-1 placeholder-white/20"
                  type="password"
                  required
              />
              </div>
          </div>

          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 transition-all py-3.5 mt-2 font-bold tracking-wide text-white rounded-xl shadow-[0_10px_20px_rgba(99,102,241,0.3)] shadow-inner border border-white/10 text-base cursor-pointer">
            {state === "register" ? "Sign Up" : "Login"}
          </motion.button>
          
          <div className="text-center mt-2">
              {state === "register" ? (
              <p className="text-sm text-gray-400">
                  Already have an account?{" "}
                  <span
                  onClick={() => setState("login")}
                  className="text-blue-400 hover:text-blue-300 font-semibold cursor-pointer transition-colors"
                  >
                  Log in
                  </span>
              </p>
              ) : (
              <p className="text-sm text-gray-400">
                  Don't have an account?{" "}
                  <span
                  onClick={() => setState("register")}
                  className="text-indigo-400 hover:text-indigo-300 font-semibold cursor-pointer transition-colors"
                  >
                  Sign up
                  </span>
              </p>
              )}
          </div>
        </motion.form>
      </div>
    </AnimatePresence>
  );
};

export default Login;
