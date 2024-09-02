const bcrypt = require("bcrypt");

const encryptPassword = async (plainPassword, saltRounds = 10) => {
  try {
    const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
    return hashedPassword;
  } catch (err) {
    throw err;
  }
};

module.exports = encryptPassword;
