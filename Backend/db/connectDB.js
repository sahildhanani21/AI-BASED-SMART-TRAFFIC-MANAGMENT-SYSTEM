let { MongoClient } = require("mongodb");
require("dotenv").config();

let connectDB = async () => {
  let url = process.env.URL;
  let client = await MongoClient.connect(url);
  let db = client.db("traffic_db");
  return db;
};




module.exports = {connectDB};
