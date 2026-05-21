// src/components/Navbar.jsx
import { NavLink, useNavigate } from "react-router-dom";
import { Shield, LogOut } from "lucide-react";

export default function Navbar() {
  const nav = useNavigate();

  const logout = () => {
    localStorage.removeItem("auth");
    nav("/login");
  };

  const baseLink =
    "px-5 py-2.5 rounded-full text-xs font-semibold tracking-[0.18em] uppercase transition-all duration-200";
  const activeLink =
    "bg-blue-600 text-white shadow-[0_0_25px_rgba(59,130,246,0.7)]";
  const inactiveLink =
    "text-slate-200/80 hover:text-white hover:bg-slate-700/70";

  return (
    <header className="fixed top-0 left-0 w-full z-40">
      {/* same gradient as pages + subtle border */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-slate-900/95 border-b border-blue-500/40 shadow-[0_8px_30px_rgba(15,23,42,0.9)]">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3 md:py-4">
          {/* Logo + title (matches badge in pages) */}
          <button
            onClick={() => nav("/")}
            className="flex items-center space-x-3 group"
          >
            <div className="relative">
              <div className="w-11 h-11 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-2xl flex items-center justify-center border border-white/25 shadow-[0_0_25px_rgba(250,204,21,0.7)]">
                <Shield className="w-6 h-6 text-slate-900" />
              </div>
              <div className="absolute inset-0 rounded-2xl bg-yellow-400/30 blur-xl -z-10 opacity-40 group-hover:opacity-70 transition-opacity"></div>
            </div>
            <div className="text-left leading-tight">
              <div className="text-[10px] text-slate-300/90 tracking-[0.25em] uppercase">
                Traffic Police
              </div>
              <div className="text-lg font-extrabold bg-gradient-to-r from-blue-300 via-white to-blue-300 bg-clip-text text-transparent">
                Smart Traffic AI
              </div>
            </div>
          </button>

          {/* Links */}
          <nav className="hidden md:flex items-center space-x-2">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `${baseLink} ${isActive ? activeLink : inactiveLink}`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/cameras"
              className={({ isActive }) =>
                `${baseLink} ${isActive ? activeLink : inactiveLink}`
              }
            >
              Cameras
            </NavLink>
             <NavLink
              to="/prediction"
              className={({ isActive }) =>
                `${baseLink} ${isActive ? activeLink : inactiveLink}`
              }
            >
              Prediction
            </NavLink>
                <NavLink
              to="/stats"
              className={({ isActive }) =>
                `${baseLink} ${isActive ? activeLink : inactiveLink}`
              }
            >
              Stats
            </NavLink>
            <NavLink
              to="/ambulance"
              className={({ isActive }) =>
                `${baseLink} ${isActive ? activeLink : inactiveLink}`
              }
            >
              Ambulance
            </NavLink>
             <NavLink
              to="/about"
              className={({ isActive }) =>
                `${baseLink} ${isActive ? activeLink : inactiveLink}`
              }
            >
              About
            </NavLink>
          </nav>

          {/* Logout – matches red buttons you already use */}
          <button
            onClick={logout}
            className="ml-4 inline-flex items-center px-5 py-2.5 rounded-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white text-xs font-semibold tracking-[0.18em] uppercase shadow-[0_0_25px_rgba(239,68,68,0.75)] transition-all duration-200"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
