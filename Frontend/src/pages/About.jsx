import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield, Code, Brain, MapPin, Clock, TrendingUp, Award, Users, Video,Ambulance } from "lucide-react";
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

export default function About() {
  const [lightPhase, setLightPhase] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setLightPhase((prev) => (prev + 1) % 4);
    }, 300);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Police Lights */}
      <motion.div className="absolute top-20 left-10 w-20 h-20 bg-red-500/20 rounded-full blur-xl animate-ping" 
        animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0.8, 0.4] }} 
        transition={{ duration: 1.5, repeat: Infinity }} 
      />
      <motion.div className="absolute top-20 right-10 w-20 h-20 bg-blue-500/20 rounded-full blur-xl animate-ping" 
        animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0.8, 0.4] }} 
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.75 }} 
      />

      {/* Light Bar */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-32 h-12 bg-gradient-to-r from-blue-600 via-red-600 to-blue-600 rounded-lg shadow-2xl flex items-center justify-center">
        <motion.div className="w-4 h-8 bg-white rounded-sm shadow-lg mx-1"
          animate={{ backgroundColor: lightPhase % 2 === 0 ? "#3B82F6" : "#EF4444", scaleY: [1, 1.2, 1] }}
          transition={{ duration: 0.3, repeat: Infinity }} 
        />
        <motion.div className="w-4 h-8 bg-white rounded-sm shadow-lg mx-1"
          animate={{ backgroundColor: lightPhase % 2 === 1 ? "#3B82F6" : "#EF4444", scaleY: [1, 1.2, 1] }}
          transition={{ duration: 0.3, repeat: Infinity, delay: 0.15 }} 
        />
      </div>

      <motion.div className="min-h-screen p-6 relative z-10" variants={containerVariants} initial="hidden" animate="visible">
        {/* Header */}
        <motion.div className="text-center mb-16" variants={itemVariants}>
          <motion.div className="w-28 h-28 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-3xl flex items-center justify-center mx-auto shadow-2xl mb-8 border-4 border-white/20 relative overflow-hidden"
            animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.02, 1] }} transition={{ duration: 4, repeat: Infinity }}
          >
            <Shield className="w-14 h-14 text-slate-900 shadow-lg" />
          </motion.div>
          <motion.h1 className="text-5xl font-black bg-gradient-to-r from-blue-400 via-white to-blue-300 bg-clip-text text-transparent mb-6 tracking-wider">
            SYSTEM ARCHITECTURE
          </motion.h1>
          <p className="text-blue-200 text-xl font-medium uppercase tracking-wider bg-slate-700/50 px-8 py-3 rounded-full inline-block max-w-2xl mx-auto">
            Ahmedabad Smart Traffic Management AI
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto space-y-12">
          {/* Core Features */}
          <motion.section className="grid lg:grid-cols-2 gap-8" variants={itemVariants}>
            <motion.div className="bg-slate-800/60 backdrop-blur-xl border border-blue-500/30 p-8 rounded-3xl shadow-2xl" variants={itemVariants}>
              <h3 className="text-2xl font-bold text-blue-300 mb-6 flex items-center">
                <Brain className="w-8 h-8 mr-3 text-emerald-400" /> CORE TECHNOLOGY
              </h3>
              <div className="space-y-4 text-slate-300">
                <div className="flex items-start space-x-3 p-4 bg-slate-700/30 rounded-xl">
                  <Code className="w-6 h-6 mt-1 text-emerald-400 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-white mb-1">YOLOv8 Real-time Detection</h4>
                    <p>Cars • Bikes • Trucks • Buses • 🚑 Ambulance (Custom Trained)</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-4 bg-slate-700/30 rounded-xl">
                  <Video className="w-6 h-6 mt-1 text-emerald-400 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-white mb-1">4-Direction Monitoring</h4>
                    <p>North • South • East • West | Full road view analysis</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div className="bg-slate-800/60 backdrop-blur-xl border border-blue-500/30 p-8 rounded-3xl shadow-2xl" variants={itemVariants}>
              <h3 className="text-2xl font-bold text-blue-300 mb-6 flex items-center">
                <TrendingUp className="w-8 h-8 mr-3 text-red-400" /> SMART FEATURES
              </h3>
              <div className="space-y-4 text-slate-300">
                <div className="flex items-start space-x-3 p-4 bg-red-500/10 border-l-4 border-red-500 rounded-xl">
                  <Ambulance className="w-6 h-6 mt-1 text-red-400 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-white mb-1">🚑 Emergency Priority</h4>
                    <p>Instant GREEN | All others RED | Auto-resume</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-4 bg-emerald-500/10 border-l-4 border-emerald-500 rounded-xl">
                  <Clock className="w-6 h-6 mt-1 text-emerald-400 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-white mb-1">Adaptive Timing</h4>
                    <p>Vehicle count + Density = Dynamic green time</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.section>

          {/* Deployment & Future */}
          <motion.section className="grid lg:grid-cols-2 gap-8" variants={itemVariants}>
            <motion.div className="bg-slate-800/60 backdrop-blur-xl border border-blue-500/30 p-8 rounded-3xl shadow-2xl" variants={itemVariants}>
              <h3 className="text-2xl font-bold text-blue-300 mb-6 flex items-center">
                <MapPin className="w-8 h-8 mr-3" /> DEPLOYMENT READY
              </h3>
              <div className="space-y-4 text-slate-300">
                <div className="flex items-center justify-center bg-gradient-to-r from-yellow-500/20 to-orange-500/20 p-6 rounded-2xl border-2 border-yellow-500/30">
                  <div className="text-center">
                    <div className="text-4xl font-black text-yellow-400 mb-2">Ahmedabad</div>
                    <div className="text-sm uppercase tracking-wider text-slate-400">Gujarat Traffic Police</div>
                  </div>
                </div>
                <ul className="grid grid-cols-2 gap-4 text-sm mt-6">
                  <li className="flex items-center text-emerald-400"><Award className="w-5 h-5 mr-2"/>Live Video Feeds</li>
                  <li className="flex items-center text-emerald-400"><Users className="w-5 h-5 mr-2"/>Multi-Officer Access</li>
                  <li className="flex items-center text-emerald-400"><TrendingUp className="w-5 h-5 mr-2"/>Congestion Prediction</li>
                  <li className="flex items-center text-emerald-400"><Clock className="w-5 h-5 mr-2"/>IoT Integration Ready</li>
                </ul>
              </div>
            </motion.div>

            <motion.div className="bg-slate-800/60 backdrop-blur-xl border border-blue-500/30 p-8 rounded-3xl shadow-2xl" variants={itemVariants}>
              <h3 className="text-2xl font-bold text-blue-300 mb-6 flex items-center">
                <Award className="w-8 h-8 mr-3 text-yellow-400" /> FUTURE EXPANSION
              </h3>
              <div className="space-y-4 text-slate-300">
                <div>• Short-term congestion forecasting</div>
                <div>• Emergency vehicle logging & reports</div>
                <div>• City-wide deployment (Gandhinagar)</div>
                <div>• Real IoT traffic light control</div>
                <div>• Mobile app for officers</div>
                <div className="pt-6 border-t border-slate-600/50 mt-6">
                  <p className="text-yellow-400 font-bold text-lg mb-2 flex items-center">
                    <MapPin className="w-6 h-6 mr-2"/> Ahmedabad • Gandhinagar Ready
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.section>
        </div>

        {/* CTA & Footer */}
        <motion.div className="text-center mt-20" variants={itemVariants}>
          <Link to="/" className="inline-flex items-center bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white px-12 py-6 rounded-3xl font-bold uppercase tracking-wider text-lg shadow-2xl hover:shadow-blue-500/30 transition-all duration-300 mb-12">
            🚦 Launch Control Panel
          </Link>
          <p className="text-xs text-slate-400 font-mono tracking-wider uppercase mb-8">
            🔒 DEVELOPED FOR GUJARAT TRAFFIC POLICE | AI-POWERED | MISSION CRITICAL
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
