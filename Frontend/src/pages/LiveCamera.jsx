import { useEffect, useState, useCallback } from "react";
import { io } from "socket.io-client";

export default function LiveTrafficDashboard() {
  const [frames, setFrames] = useState({
    north: null,
    south: null,
    east: null,
    west: null,
  });

  const [congestion, setCongestion] = useState({
    north: "Low",
    south: "Medium",
    east: "Low",
    west: "High",
  });

  const [greenTime, setGreenTime] = useState({
    north: 24,
    south: 18,
    east: 30,
    west: 15,
  });

  /* ================= SOCKET ================= */
  useEffect(() => {
    const socket = io("http://localhost:8000", {
      transports: ["websocket"],
    });

    socket.on("connect", () => {
      console.log("✅ React socket connected");
    });

    socket.on("frame", (data) => {
      console.log("📸 Frame received:", data.camera);
      setFrames((prev) => ({
        ...prev,
        [data.camera]: data.image,
      }));
    });

    socket.on("signal_priority", ({ camera }) => {
      setCongestion((prev) => ({
        ...prev,
        [camera]: "Emergency",
      }));
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const badgeColor = (level) => {
    if (level === "High") return "bg-red-500/20 text-red-400";
    if (level === "Medium") return "bg-yellow-500/20 text-yellow-400";
    if (level === "Emergency") return "bg-red-600 text-white";
    return "bg-green-500/20 text-green-400";
  };

  const cameras = ["north", "south", "east", "west"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] to-[#020617] p-6">
      <h1 className="text-2xl font-bold text-white mb-6">
        🚦 Smart Traffic Control – Live Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cameras.map((cam) => (
          <div
            key={cam}
            className="rounded-2xl border border-white/10 bg-black/40 shadow-xl"
          >
            {/* HEADER */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
              <h2 className="text-white font-semibold capitalize">
                {cam} Signal Camera
              </h2>

              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${badgeColor(
                  congestion[cam]
                )}`}
              >
                {congestion[cam]}
              </span>
            </div>

            {/* VIDEO */}
            <div className="h-[260px] bg-black flex items-center justify-center">
              {frames[cam] ? (
                <img
                  src={`data:image/jpeg;base64,${frames[cam]}`}
                  alt={`${cam} camera`}
                  className="w-[640px] h-[360px] object-cover rounded-b-xl"
                />
              ) : (
                <div className="text-center">
                  <p className="text-gray-500 mb-2">Waiting for stream...</p>
                  <div className="w-20 h-20 border-4 border-gray-700 border-t-blue-500 rounded-full animate-spin mx-auto"></div>
                </div>
              )}
            </div>

            {/* FOOTER */}
            <div className="px-4 py-3 text-sm text-gray-300">
              Green time remaining:{" "}
              <span className="text-green-400 font-semibold">
                {greenTime[cam]}s
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
