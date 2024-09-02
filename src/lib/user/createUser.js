const { User } = require("@/models");
const userDefault = require("../../config/userDefault");

const createUser = ({
  name,
  email,
  password,
  walletBalance = userDefault.walletBalance,
  tickets = userDefault.tickets,
}) => {
  const user = new User({ name, email, password, walletBalance, tickets });

  return user.save();
};

module.exports = createUser;
