const { connectDB } = require("../db/connectDB");
const bcrypt = require("bcrypt");

let login = async (req, res) => {
  try {
    const db = await connectDB();
    const collection = db.collection("user");

    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const user = await collection.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }
    
    req.session.user = {
      id: user._id,
      username: user.name,
      // email: user.email
    }
    req.session.save();
    return res.status(200).json({
      success: true,
      message: "Login successful",
      username: user.name,
      id: user._id
    });

  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { login };