import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, Loader2, Shield, AlertTriangle, User } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function Signup() {

  const nav = useNavigate();

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");
  const [cpassword,setCpassword] = useState("");

  const [showPassword,setShowPassword] = useState(false);
  const [isLoading,setIsLoading] = useState(false);
  const [lightPhase,setLightPhase] = useState(0);

  useEffect(()=>{
    const interval = setInterval(()=>{
      setLightPhase(prev => (prev+1)%4);
    },300);
    return ()=>clearInterval(interval);
  },[]);

  /* ===== SIGNUP API ===== */
  const signup = async ()=>{

    if(!name || !email || !username || !password || !cpassword){
      return toast.error("Fill all fields");
    }

    try{

      setIsLoading(true);

      const res = await axios.post(
        "http://localhost:8080/register",
        { name,email,username,password,cpassword },
        { withCredentials:true }
      );

      if(res.data.success){
        toast.success("Officer Registered 🚓");
        nav("/login");
      }

    }catch(err){
      toast.error(err.response?.data?.message || "Signup failed");
    }
    finally{
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">

      <motion.div className="min-h-screen flex items-center justify-center p-4 relative z-10">

        <motion.div className="relative bg-slate-800/50 backdrop-blur-xl border border-blue-500/30 p-10 rounded-3xl w-full max-w-md shadow-2xl text-white">

          <div className="text-center mb-8">
            <Shield className="mx-auto mb-4 text-yellow-400" size={50}/>
            <h2 className="text-4xl font-black text-white mb-3">
              OFFICER REGISTRATION
            </h2>
          </div>

          <div className="space-y-6">

            {/* Name */}
            <input
              className="w-full px-5 py-4 bg-slate-900/80 border-2 border-slate-600 rounded-2xl text-white placeholder-slate-400 focus:border-blue-500"
              placeholder="Full Name"
              value={name}
              onChange={(e)=>setName(e.target.value)}
            />

            {/* Email */}
            <input
              className="w-full px-5 py-4 bg-slate-900/80 border-2 border-slate-600 rounded-2xl text-white placeholder-slate-400 focus:border-blue-500"
              placeholder="Email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
            />

            {/* Username */}
            <input
              className="w-full px-5 py-4 bg-slate-900/80 border-2 border-slate-600 rounded-2xl text-white placeholder-slate-400 focus:border-blue-500"
              placeholder="Username"
              value={username}
              onChange={(e)=>setUsername(e.target.value)}
            />

            {/* Password */}
            <div className="relative">
              <input
                type={showPassword?"text":"password"}
                className="w-full px-5 py-4 bg-slate-900/80 border-2 border-slate-600 rounded-2xl text-white placeholder-slate-400 focus:border-blue-500"
                placeholder="Password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={()=>setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
              >
                {showPassword ? <EyeOff/> : <Eye/>}
              </button>
            </div>

            {/* Confirm Password */}
            <input
              type="password"
              className="w-full px-5 py-4 bg-slate-900/80 border-2 border-slate-600 rounded-2xl text-white placeholder-slate-400 focus:border-blue-500"
              placeholder="Confirm Password"
              value={cpassword}
              onChange={(e)=>setCpassword(e.target.value)}
            />

            <motion.button
              onClick={signup}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-emerald-600 to-blue-700 text-white py-5 rounded-2xl font-bold"
            >
              {isLoading ? "Creating Account..." : "REGISTER OFFICER"}
            </motion.button>

            <Link to="/login" className="block text-center text-blue-400">
              Already Registered?
            </Link>

          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
