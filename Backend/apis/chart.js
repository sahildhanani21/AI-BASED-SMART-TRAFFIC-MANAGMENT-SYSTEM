const { connectDB } = require("../db/connectDB");
let chart = async (req, res) => {
  const db = await connectDB();
  const collection = db.collection("traffic_analytics");

  const count = await collection.countDocuments();
  console.log("📦 Total Docs:", count);

  const data = await collection
    .find({})
    .sort({ timestamp: -1 })
    .limit(10)
    .toArray();

  console.log("📊 Fetched:", data.length);

  res.status(200).json({
    success: true,
    data: data.reverse()
  });
};

module.exports = {
  chart
}