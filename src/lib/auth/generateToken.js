const jwt = require("jsonwebtoken");

const generateToken = ({ data, algorithm = "HS256" }) => {
  const privateKey = process.env.JWT_SECRET;
  return jwt.sign(data, privateKey, { algorithm });
};

module.exports = generateToken;
