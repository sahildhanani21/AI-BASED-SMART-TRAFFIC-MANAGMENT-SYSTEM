import { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";

export default function LiveTrafficDashboard() {

  const areaSignals = {
    Bapunagar: ["north", "east", "south", "west"],
    Nikol: ["north", "east", "south", "west"],
    "CG Road": ["north", "east", "south", "west"]
  };

  const [selectedArea, setSelectedArea] = useState("Bapunagar");

  const [frames, setFrames] = useState({});
  const [activeCamera, setActiveCamera] = useState("north");
  const [countdown, setCountdown] = useState(10);

  const socketRef = useRef(null);
  const timerRef = useRef(null);
  const selectedAreaRef = useRef(selectedArea);

  /* Keep ref updated */
  useEffect(() => {
    selectedAreaRef.current = selectedArea;
  }, [selectedArea]);

  /* ================= SOCKET (CONNECT ONLY ONCE) ================= */
  useEffect(() => {

    socketRef.current = io("http://localhost:8080");

    const socket = socketRef.current;

    socket.on("connect", () => {
      console.log("✅ React connected to socket");
    });

    socket.on("frame", (data) => {

      // Filter dynamically using ref
      if (data.area !== selectedAreaRef.current) return;

      setFrames(prev => ({
        ...prev,
        [data.camera]: data.image
      }));
    });

    socket.on("signal_update", (data) => {

      if (data.area !== selectedAreaRef.current) return;

      setActiveCamera(data.camera);
      setCountdown(data.greenTime);
    });

    return () => socket.disconnect();

  }, []); // 🔥 EMPTY dependency

  /* ================= COUNTDOWN ================= */
  useEffect(() => {

    clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      setCountdown(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timerRef.current);

  }, [activeCamera]);

  /* ================= UI ================= */
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] to-[#020617] p-6">

      <h1 className="text-2xl font-bold text-white mb-6">
        🚦 Smart Traffic Control – Live Dashboard
      </h1>

      <div className="mb-6 flex items-center gap-4">
        <label className="text-white font-medium">Select Area:</label>

        <select
          value={selectedArea}
          onChange={(e) => {
            setSelectedArea(e.target.value);
            setFrames({});
          }}
          className="px-4 py-2 rounded-lg bg-slate-800 text-white border border-white/20"
        >
          {Object.keys(areaSignals).map((area) => (
            <option key={area} value={area}>
              {area}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {areaSignals[selectedArea].map((cam) => (

          <div
            key={cam}
            className={`rounded-2xl border border-white/10 bg-black/40 shadow-xl ${
              activeCamera === cam ? "ring-4 ring-green-400/50" : ""
            }`}
          >

            <div className="flex justify-between px-4 py-3 border-b border-white/10">
              <h2 className="text-white font-semibold capitalize">
                {cam} Camera
              </h2>
            </div>

            <div className="w-full bg-black relative aspect-video overflow-hidden">
              {frames[cam] ? (
                <img
                  src={`data:image/jpeg;base64,${frames[cam]}`}
                  alt={cam}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500">
                  Waiting for stream...
                </div>
              )}
            </div>

            <div className="px-4 py-3 text-sm text-gray-300">
              Green Signal:
              <span className="text-green-400 font-semibold ml-2">
                {activeCamera === cam ? countdown : 0}s
              </span>
            </div>

          </div>

        ))}

      </div>

    </div>
  );
}