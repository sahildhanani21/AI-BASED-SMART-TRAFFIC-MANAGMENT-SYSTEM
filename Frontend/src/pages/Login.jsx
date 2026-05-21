import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function Login(){

  const nav = useNavigate();

  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");
  const [showPassword,setShowPassword] = useState(false);
  const [isLoading,setIsLoading] = useState(false);

  const login = async ()=>{

    if(!username || !password){
      return toast.error("Enter username & password");
    }

    try{

      setIsLoading(true);

      const res = await axios.post(
        "http://localhost:8080/login",
        { username,password },
        { withCredentials:true }
      );

      if(res.data.success){
        localStorage.setItem("auth","true");
        toast.success("Login Successful 🚦");
        nav("/");
      }

    }catch(err){
      toast.error(err.response?.data?.message || "Login failed");
    }
    finally{
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">

      <div className="bg-slate-800/50 backdrop-blur-xl border border-blue-500/30 p-10 rounded-3xl w-full max-w-md shadow-2xl">

        <h2 className="text-4xl font-black text-center mb-8">
          POLICE AI PORTAL
        </h2>

        <div className="space-y-6">

          <input
            className="w-full px-5 py-4 bg-slate-900/80 border-2 border-slate-600 rounded-2xl text-white placeholder-slate-400 focus:border-blue-500"
            placeholder="Username"
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
          />

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

          <button
            onClick={login}
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-5 rounded-2xl font-bold"
          >
            {isLoading ? "Verifying..." : "ENTER CONTROL CENTER"}
          </button>

          <Link to="/signup" className="block text-center text-blue-400">
            New Officer Registration
          </Link>

        </div>
      </div>
    </div>
  );
}
