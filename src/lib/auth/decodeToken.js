const jwt = require("jsonwebtoken");
const { badRequest } = require("@/error");

const decodeToken = (token) => {
  const secret = process.env.JWT_SECRET;
  try {
    return jwt.verify(token, secret);
  } catch (err) {
    return badRequest("Not a valid token.");
  }
};
module.exports = decodeToken;
