const bcrypt = require("bcrypt");

const isVerifiedPassword = (normalPassword, hashedPassword) => {
  return bcrypt.compare(normalPassword, hashedPassword);
};

module.exports = isVerifiedPassword;
