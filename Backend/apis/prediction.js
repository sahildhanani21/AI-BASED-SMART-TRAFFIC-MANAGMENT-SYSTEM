const { connectDB } = require("../db/connectDB");

let prediction = async (req, res) => {
  try {
    const db = await connectDB();
    const collection = db.collection("traffic_predictions");

    //  Get latest prediction per area
    const data = await collection.aggregate([
      { $sort: { timestamp: -1 } },
      {
        $group: {
          _id: "$area",
          latest: { $first: "$$ROOT" }
        }
      },
      { $replaceRoot: { newRoot: "$latest" } }
    ]).toArray();

    //  Format response
    const formatted = data.map((doc) => ({
      area: doc.area,
      predictedDirection: doc.predicted_direction?.toUpperCase(),
      predictedCongestion: doc.predicted_congestion,
      avgSpeedKmH: doc.avg_speed_kmh,
      predictedVehiclesPerMin: doc.predicted_vehicles_per_min
    }));

    res.status(200).json({
      success: true,
      message: "Prediction retrieved successfully.",
      data: formatted
    });

  } catch (error) {
    console.error("Prediction Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Prediction service unavailable"
    });
  }
};

module.exports = {
  prediction
};