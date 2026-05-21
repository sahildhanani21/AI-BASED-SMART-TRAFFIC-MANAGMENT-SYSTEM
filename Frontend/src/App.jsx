// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedLayout from "./pages/ProtectedLayout";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import AmbulancePage from "./pages/Ambulance.jsx";
import Cameras from "./pages/Cameras.jsx";
import Prediction from "./pages/Prediction.jsx";
import Stats from "./pages/Stats.jsx";

import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import ForgotPwd from "./pages/Forget-pwd.jsx";
import LiveCamera from "./pages/LiveCamera.jsx";  
import LiveTrafficDashboard from "./pages/LiveTrafficDashboard.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        {/* Login pages (no navbar) */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPwd />} />

        {/* All other pages (with navbar, no auth) */}
        <Route element={<ProtectedLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/ambulance" element={<AmbulancePage />} />
          <Route path="/cameras" element={<Cameras />} />
          <Route path="/prediction" element={<Prediction />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/LiveCamera" element={<LiveCamera />}/>
          <Route path="/LiveTrafficDashboard" element={<LiveTrafficDashboard/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
