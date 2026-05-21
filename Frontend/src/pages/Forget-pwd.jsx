import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Loader2, Shield, Mail, AlertTriangle } from "lucide-react";
import { useState, useEffect } from "react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12
    }
  }
};

const buttonVariants = {
  hover: { scale: 1.05, boxShadow: "0 20px 40px rgba(59, 130, 246, 0.4)" },
  tap: { scale: 0.98 }
};

export default function ForgotPassword() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [lightPhase, setLightPhase] = useState(0);

  // Police light rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setLightPhase((prev) => (prev + 1) % 4);
    }, 300);
    return () => clearInterval(interval);
  }, []);

  const sendResetLink = async () => {
    if (!email) {
      alert("Please enter your officer email");
      return;
    }
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    alert("Reset link sent to your email!");
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Police Patrol Lights */}
      <motion.div 
        className="absolute top-20 left-10 w-20 h-20 bg-red-500/20 rounded-full blur-xl animate-ping"
        animate={{ 
          scale: [1, 1.5, 1],
          opacity: [0.4, 0.8, 0.4]
        }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
      <motion.div 
        className="absolute top-20 right-10 w-20 h-20 bg-blue-500/20 rounded-full blur-xl animate-ping"
        animate={{ 
          scale: [1, 1.5, 1],
          opacity: [0.4, 0.8, 0.4]
        }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.75 }}
      />

      {/* Rotating Police Light Bar */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-32 h-12 bg-gradient-to-r from-blue-600 via-red-600 to-blue-600 rounded-lg shadow-2xl flex items-center justify-center">
        <motion.div
          className="w-4 h-8 bg-white rounded-sm shadow-lg mx-1"
          animate={{ 
            backgroundColor: lightPhase % 2 === 0 ? "#3B82F6" : "#EF4444",
            scaleY: [1, 1.2, 1]
          }}
          transition={{ duration: 0.3, repeat: Infinity }}
        />
        <motion.div
          className="w-4 h-8 bg-white rounded-sm shadow-lg mx-1"
          animate={{ 
            backgroundColor: lightPhase % 2 === 1 ? "#3B82F6" : "#EF4444",
            scaleY: [1, 1.2, 1]
          }}
          transition={{ duration: 0.3, repeat: Infinity, delay: 0.15 }}
        />
      </div>

      {/* Main Content */}
      <motion.div
        className="min-h-screen flex items-center justify-center p-4 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="relative bg-slate-800/50 backdrop-blur-xl border border-blue-500/30 p-10 rounded-3xl w-full max-w-md shadow-2xl shadow-blue-500/20 text-white overflow-hidden"
          variants={itemVariants}
          whileHover={{ y: -10 }}
          transition={{ duration: 0.3 }}
        >
          {/* Police Badge Header */}
          <motion.div className="text-center mb-8" variants={itemVariants}>
            <motion.div
              className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-3xl flex items-center justify-center mx-auto shadow-2xl mb-6 border-4 border-white/20 relative overflow-hidden"
              animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.02, 1] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <Shield className="w-12 h-12 text-slate-900 shadow-lg" />
            </motion.div>
            
            <motion.h2 
              className="text-4xl font-black bg-gradient-to-r from-blue-400 via-white to-blue-300 bg-clip-text text-transparent mb-3 tracking-wider"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              ACCESS RECOVERY
            </motion.h2>
            <p className="text-blue-200 text-sm font-medium uppercase tracking-wider bg-slate-700/50 px-4 py-1 rounded-full inline-block">
              Reset Officer Credentials
            </p>
          </motion.div>

          {/* Forgot Password Form */}
          <div className="space-y-6">
            <motion.div variants={itemVariants}>
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-5 py-4 bg-slate-900/80 backdrop-blur-sm border-2 border-slate-600 rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/30 transition-all duration-300 text-lg peer pr-12"
                  placeholder="Official Email"
                  required
                />
                <label 
                  htmlFor="email"
                  className="absolute left-5 top-4 text-sm text-slate-400 transition-all duration-300 peer-focus:-top-2 peer-focus:text-blue-400 peer-focus:text-xs peer-valid:-top-2 peer-valid:text-blue-400 peer-valid:text-xs bg-slate-900/90 px-2 rounded pointer-events-none"
                >
                  📧 Officer Email
                </label>
              </div>
            </motion.div>

            {/* Reset Button */}
            <motion.button
              onClick={sendResetLink}
              disabled={isLoading || !email}
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 disabled:from-slate-700 disabled:to-slate-800 text-white py-5 rounded-2xl font-bold text-lg shadow-2xl shadow-orange-500/30 relative overflow-hidden group disabled:opacity-60 disabled:cursor-not-allowed border border-orange-500/50 uppercase tracking-wider disabled:border-slate-600"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin mr-2 inline" />
                  Sending Reset Link...
                </>
              ) : (
                "🚨 SEND EMERGENCY RESET"
              )}
            </motion.button>
          </div>

          {/* Links */}
          <motion.div 
            className="mt-8 pt-6 border-t border-slate-600/50 space-y-2"
            variants={itemVariants}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <Link
              to="/login"
              className="block w-full text-center text-sm text-blue-400 hover:text-blue-300 font-medium tracking-wider transition-all duration-200 hover:underline py-3 px-4 bg-slate-700/50 rounded-xl hover:bg-slate-600/50 flex items-center justify-center mx-auto"
            >
              <Shield size={16} className="mr-2" />
              Return to Login
            </Link>
            
            <p className="text-center text-xs text-slate-400 font-mono tracking-wider">
              🔒 SECURE POLICE NETWORK
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
