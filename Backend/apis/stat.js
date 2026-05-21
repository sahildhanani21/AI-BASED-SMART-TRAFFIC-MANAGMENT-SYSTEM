const { connectDB } = require("../db/connectDB");


let stat = async(req,res) => {
    const db = await connectDB();
    const collection = db.collection("traffic_analytics");
    const data = await collection.find({}).sort({timestamp: -1}).toArray();

    res.status(200).json({
      success: true,
      message: "Data retrieved successfully.",
      data: data
    });
}
module.exports = {
    stat
}