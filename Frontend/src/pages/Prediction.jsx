import { useEffect, useState } from "react";

const AREAS = [
  // "All Circles",
  "Nikol",
  "Bapunagar",
  "CG Road"
];

const congestionBadge = (level) => {
  if (level === "High")
    return "bg-red-500/15 text-red-300 border-red-500/60";
  if (level === "Medium")
    return "bg-yellow-500/15 text-yellow-300 border-yellow-500/60";
  return "bg-emerald-500/15 text-emerald-300 border-emerald-500/60";
};

export default function Prediction() {
  const [selectedArea, setSelectedArea] = useState("All Circles");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch Area-wise prediction
  useEffect(() => {
    fetch("http://localhost:8080/api/predictions")
      .then((res) => res.json())
      .then((result) => {
         setData(result.data);  // now expecting ARRAY
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filteredData =
    selectedArea === "All Circles"
      ? data
      : data.filter((row) => row.area === selectedArea);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 px-6 pb-10 pt-24">
      <div className="max-w-6xl mx-auto mb-8 flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black text-blue-200">
            Future Traffic Prediction
          </h1>
          <p className="text-sm text-blue-300/80">
            AI-based real-time signal forecasting
          </p>
        </div>

        <select
          value={selectedArea}
          onChange={(e) => setSelectedArea(e.target.value)}
          className="bg-slate-900 border border-blue-500/50 text-white px-4 py-2 rounded-xl"
        >
          {AREAS.map((area) => (
            <option key={area}>{area}</option>
          ))}
        </select>
      </div>

      {loading && (
        <div className="text-center text-blue-300">Loading prediction...</div>
      )}

      {!loading && filteredData.length > 0 && (
        <div className="max-w-6xl mx-auto mt-10 space-y-8">
          {filteredData.map((row, i) => (
            <div
              key={i}
              className="grid grid-cols-1 md:grid-cols-4 gap-6 bg-slate-900/80 border border-blue-500/20 rounded-3xl p-8 shadow-2xl backdrop-blur-xl"
            >
              {/* AREA */}
              <div className="flex flex-col justify-center">
                <h2 className="text-2xl font-bold text-blue-200">
                  {row.area}
                </h2>
                <p className="text-sm text-slate-400 mt-2">
                  Predicted Green:{" "}
                  <span className="text-emerald-400 font-semibold">
                    {row.predictedDirection}
                  </span>
                </p>
              </div>

              {/* CONGESTION */}
              <div className="bg-slate-950/80 rounded-2xl p-5 text-center">
                <p className="text-xs uppercase tracking-widest text-slate-400">
                  Congestion Level
                </p>
                <span
                  className={`inline-block mt-3 px-4 py-1 rounded-full border text-sm font-semibold ${congestionBadge(
                    row.predictedCongestion
                  )}`}
                >
                  {row.predictedCongestion}
                </span>
              </div>

              {/* SPEED */}
              <div className="bg-slate-950/80 rounded-2xl p-5 text-center">
                <p className="text-xs uppercase tracking-widest text-slate-400">
                  Avg Speed
                </p>
                <p className="text-3xl font-bold text-emerald-400 mt-2">
                  {row.avgSpeedKmH}
                  <span className="text-sm text-slate-400 ml-1">km/h</span>
                </p>
              </div>

              {/* VEHICLES */}
              <div className="bg-slate-950/80 rounded-2xl p-5 text-center">
                <p className="text-xs uppercase tracking-widest text-slate-400">
                  Vehicles / min
                </p>
                <p className="text-3xl font-bold text-blue-300 mt-2">
                  {row.predictedVehiclesPerMin}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}