// src/pages/Cameras.jsx
import { useState } from "react";
// Remove this if Navbar is already rendered by your layout
// import Navbar from "../components/Navbar";

const AREAS = [
  "CG Road Circle",
  "Nehrunagar Circle",
  "Iskcon Crossroad",
  "Panjrapole Crossroad",
  "Helmet Circle",
  "Sarkhej Crossroad"
];

const DIRECTIONS = ["North", "South", "East", "West"];

const congestionColors = {
  Low: "bg-emerald-500/20 text-emerald-300 border-emerald-400/60",
  Medium: "bg-yellow-500/20 text-yellow-300 border-yellow-400/60",
  High: "bg-red-500/20 text-red-300 border-red-400/60"
};

export default function Cameras() {
  const [selectedArea, setSelectedArea] = useState(AREAS[0]);

  // Dummy data – replace later with real values from backend
  const greenTimeByDirection = {
    North: 24,
    South: 18,
    East: 32,
    West: 12
  };

  const congestionByDirection = {
    North: "High",
    South: "Medium",
    East: "Low",
    West: "High"
  };

  return (
    <>
      {/* If using layout navbar, remove this line */}
      {/* <Navbar /> */}

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 px-6 pb-10 pt-24">
        {/* Top heading + area selector */}
        <div className="max-w-6xl mx-auto mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-blue-300 via-white to-blue-300 bg-clip-text text-transparent tracking-wide">
              Live Junction Cameras
            </h1>
            <p className="text-sm text-blue-200/80 mt-1 uppercase tracking-[0.2em]">
              Ahmedabad Traffic Police • 4‑Direction View
            </p>
          </div>

          <div className="flex flex-col md:flex-row md:items-center gap-3">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-[0.2em]">
              Select Circle
            </label>
            <select
              value={selectedArea}
              onChange={(e) => setSelectedArea(e.target.value)}
              className="bg-slate-900/80 border border-blue-500/50 text-slate-100 text-sm px-4 py-2.5 rounded-2xl shadow-[0_0_25px_rgba(37,99,235,0.3)] focus:outline-none focus:ring-2 focus:ring-blue-500/70"
            >
              {AREAS.map((area) => (
                <option key={area} value={area}>
                  {area}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 4 camera grid */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {DIRECTIONS.map((dir) => {
            const green = greenTimeByDirection[dir];
            const level = congestionByDirection[dir];
            const levelClass = congestionColors[level];

            return (
              <div
                key={dir}
                className="bg-slate-900/80 border border-slate-700/80 rounded-3xl overflow-hidden shadow-2xl shadow-slate-900/80 backdrop-blur-xl"
              >
                {/* Header */}
                <div className="px-4 py-3 flex items-center justify-between bg-slate-900/90 border-b border-slate-700/70">
                  <div>
                    <p className="text-[11px] text-slate-400 uppercase tracking-[0.25em]">
                      {selectedArea}
                    </p>
                    <h2 className="text-sm md:text-base font-semibold text-slate-50 tracking-wide">
                      {dir} Signal Camera
                    </h2>
                  </div>
                  <div
                    className={`text-[11px] px-3 py-1 rounded-full border ${levelClass}`}
                  >
                    Congestion: <span className="font-bold">{level}</span>
                  </div>
                </div>

                {/* Video */}
                <div className="bg-black">
                  {/* Map to different src per direction if needed */}
                  <video
                    src="/sample.mp4"
                    controls
                    autoPlay
                    loop
                    muted
                    className="w-full h-52 md:h-64 object-cover"
                  />
                </div>

                {/* Footer: timing + status */}
                <div className="px-4 py-3 bg-slate-950/90 border-t border-slate-700/70 flex items-center justify-between text-xs md:text-sm text-slate-200">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-green-400 shadow-[0_0_15px_rgba(74,222,128,0.9)]" />
                    <span className="font-semibold tracking-wide">
                      Green time remaining:
                    </span>
                    <span className="font-bold text-green-300">
                      {green}s
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400 uppercase tracking-[0.2em]">
                    Adaptive Signal • Live
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
