import { useState, useEffect } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
   Filler 
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
   Filler 
);

const toIST = (utc) =>
  new Date(utc).toLocaleTimeString("en-IN", {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit"
  });

// 🔥 Traffic Level Logic
const getTrafficLevel = (total) => {
  if (total > 100) return "High";
  if (total > 60) return "Medium";
  return "Low";
};

const badgeColor = (level) => {
  if (level === "High") return "bg-red-500/20 text-red-300";
  if (level === "Medium") return "bg-yellow-500/20 text-yellow-300";
  return "bg-emerald-500/20 text-emerald-300";
};

export default function Home() {
  const [chartData, setChartData] = useState({});
  const [latestStatus, setLatestStatus] = useState({});

  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:8080/data");

      const raw = res.data.data;

      const labels = raw.map(d => toIST(d.timestamp));

      const areas = ["Nikol", "Bapunagar", "CG Road"];

      let newChartData = {};
      let newStatus = {};

      areas.forEach(area => {
        const totals = raw.map(d => d[area]?.total || 0);

        newChartData[area] = {
          labels,
          datasets: [
            {
              label: `${area} Vehicles`,
              data: totals,
              borderColor: "#38bdf8",
              backgroundColor: "rgba(56,189,248,0.15)",
              borderWidth: 3,
              tension: 0.4,
              fill: true
            }
          ]
        };

        const latestTotal = totals[totals.length - 1];
        newStatus[area] = getTrafficLevel(latestTotal);
      });

      setChartData(newChartData);
      setLatestStatus(newStatus);

    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        labels: { color: "#e2e8f0" }
      }
    },
    scales: {
      x: {
        ticks: { color: "#cbd5e1" },
        grid: { color: "rgba(255,255,255,0.05)" }
      },
      y: {
        ticks: { color: "#cbd5e1" },
        grid: { color: "rgba(255,255,255,0.05)" }
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-8">

      <h1 className="text-4xl font-black text-center text-blue-200 mb-12">
        Real-Time Traffic Monitoring Dashboard
      </h1>

      <div className="grid lg:grid-cols-2 gap-10 max-w-7xl mx-auto">

        {["Nikol", "Bapunagar", "CG Road"].map((area) => (
          <div
            key={area}
            className="bg-slate-800/60 border border-blue-500/30 p-6 rounded-3xl"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold text-blue-300">
                {area}
              </h3>

              {latestStatus[area] && (
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${badgeColor(latestStatus[area])}`}>
                  {latestStatus[area]}
                </span>
              )}
            </div>

            {chartData[area] && (
              <Line
                data={chartData[area]}
                options={chartOptions}
              />
            )}
          </div>
        ))}

      </div>

      <div className="mt-16 text-center text-slate-400 text-sm">
        
        🚦 AI Powered • Real-Time • MongoDB Atlas
      </div>
    </div>
  );
}