const jwt = require("jsonwebtoken");
require("dotenv").config();
const auth = (req, res, next) => {
  try {
    let token = req.headers.authorization?.split(" ")[1] || "";
    // console.log(token);
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET_KEY, function (err, decoded) {
        if (decoded) {
          req.userId = decoded.userId;
          next();
        } else {
          return res.status(400).json({ message: "Unauthorized" });
        }
      });
    } else {
      return res.status(500).json({ message: "Unauthorized" });
    }
  } catch (e) {
    return res.status(500).json({ message: "Unauthorized" });
  }
};

module.exports = auth;
