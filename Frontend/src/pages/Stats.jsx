import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Stats.css";

const Stats = () => {
  const [data, setData] = useState([]);
  const [selectedArea, setSelectedArea] = useState("All");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:8080/stat");
      setData(res.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getTrafficLevel = (total) => {
    if (total < 110) return "Low";
    if (total < 125) return "Medium";
    return "High";
  };

  const areas = ["All", "Nikol", "Bapunagar", "CG Road"];

  return (
    <div className="stats-container">
      <h2 className="stats-title">Traffic Analytics Dashboard</h2>

      {/* Dropdown */}
      <div className="selector-container">
        <label>Select Area: </label>
        <select
          value={selectedArea}
          onChange={(e) => setSelectedArea(e.target.value)}
        >
          {areas.map((area, index) => (
            <option key={index} value={area}>
              {area}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>Area</th>
              <th>North</th>
              <th>South</th>
              <th>East</th>
              <th>West</th>
              <th>Total</th>
              <th>Traffic Level</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => {
              return areas.slice(1).map((area) => {
                if (selectedArea !== "All" && selectedArea !== area)
                  return null;

                const areaData = item[area];
                if (!areaData) return null;

                const total =
                  areaData.total ||
                  areaData.north +
                    areaData.south +
                    areaData.east +
                    areaData.west;

                const level = getTrafficLevel(total);

                return (
                  <tr key={`${index}-${area}`}>
                    <td>
                      {new Date(item.timestamp).toLocaleString()}
                    </td>
                    <td>{area}</td>
                    <td>{areaData.north}</td>
                    <td>{areaData.south}</td>
                    <td>{areaData.east}</td>
                    <td>{areaData.west}</td>
                    <td>{total}</td>
                    <td>
                      <span className={`badge ${level.toLowerCase()}`}>
                        {level}
                      </span>
                    </td>
                  </tr>
                );
              });
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Stats;