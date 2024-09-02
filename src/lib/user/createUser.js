const { User } = require("@/models");

const createUser = ({ name, email, password, walletBalance, tickets }) => {
  const user = new User({ name, email, password, walletBalance, tickets });

  return user.save();
};

module.exports = createUser;
