const { User } = require("@/models");

const findUser = async ({ email }) => {
  let user = await User.findOne({ email });
  return user ? user._doc : false;
};

module.exports = findUser;
