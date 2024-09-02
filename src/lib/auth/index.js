const decodeToken = require("./decodeToken");
const encryptPassword = require("./encryptPassword");
const generateToken = require("./generateToken");
const isVerifiedPassword = require("./isVerifiedPassword");
const login = require("./login");
const register = require("./register");

module.exports = {
  encryptPassword,
  isVerifiedPassword,
  register,
  generateToken,
  login,
  decodeToken,
};
