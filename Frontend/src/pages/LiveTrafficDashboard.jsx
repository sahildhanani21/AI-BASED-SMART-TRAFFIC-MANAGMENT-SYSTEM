import { useEffect, useState } from "react";
import { io } from "socket.io-client";

export default function LiveTrafficDashboard() {
  const cameras = ["north", "south", "east", "west"];

  const [frames, setFrames] = useState({});
  const [greenTimes, setGreenTimes] = useState({});
  const [activeCamera, setActiveCamera] = useState("north");
  const [congestion, setCongestion] = useState({});

  useEffect(() => {
    const socket = io("http://localhost:8000", {
      transports: ["websocket"],
    });

    socket.on("frame", (data) => {
      setFrames(prev => ({
        ...prev,
        [data.camera]: data.image
      }));
    });

    socket.on("signal_update", (data) => {
      setGreenTimes(prev => ({
        ...prev,
        [data.camera]: data.greenTime
      }));
      if (data.priority) {
        setActiveCamera(data.camera);
      }
    });

    socket.on("signal_priority", ({ camera }) => {
      setCongestion(prev => ({
        ...prev,
        [camera]: "Emergency"
      }));
      setActiveCamera(camera);
    });

    return () => socket.disconnect();
  }, []);

  const badgeColor = (level) => {
    if (level === "Emergency") return "bg-red-600 text-white";
    return "bg-green-500/20 text-green-400";
  };

  return (
    <div className="min-h-screen bg-slate-900 p-6">
      <h1 className="text-white text-2xl mb-4">
        🚦 Smart Traffic Control – Live
      </h1>

      <div className="grid md:grid-cols-2 gap-6">
        {cameras.map(cam => (
          <div
            key={cam}
            className={`bg-black rounded-xl border p-3 ${
              activeCamera === cam ? "ring-4 ring-green-400" : ""
            }`}
          >
            <div className="flex justify-between text-white mb-2">
              <span className="capitalize">{cam}</span>
              <span className={`px-3 py-1 rounded-full text-xs ${badgeColor(congestion[cam])}`}>
                {congestion[cam] || "Normal"}
              </span>
            </div>

            <div className="h-56 bg-black flex justify-center items-center">
              {frames[cam] ? (
                <img
                  src={`data:image/jpeg;base64,${frames[cam]}`}
                  className="object-cover"
                />
              ) : (
                <span className="text-gray-500">Waiting...</span>
              )}
            </div>

            <p className="text-green-400 mt-2">
              Green Time: {greenTimes[cam] || 10}s
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
