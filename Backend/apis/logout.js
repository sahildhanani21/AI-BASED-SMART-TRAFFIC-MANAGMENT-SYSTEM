let logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Logout error:", err);
      return res.status(500).json({ message: "Logout failed" });
    }

    // Clear the session cookie (very important)
    res.clearCookie('connect.sid'); // 'connect.sid' is default cookie name in express-session

    return res.status(200).json({ success: true, message: "Logged out successfully" });
  });
};

module.exports = { logout };
