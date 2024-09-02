const { badRequest } = require("@/error");
const { createUser, findUser } = require("../user");

const register = async ({ name, email, password, walletBalance, tickets }) => {
  if (!name || !email || !password) {
    return badRequest("One or more credentials are missing");
  }

  const isUserExist = await findUser({ email });
  if (isUserExist) {
    return badRequest("User already exists, Try with another email");
  }

  const newUser = await createUser({
    name,
    email,
    password,
    walletBalance,
    tickets,
  });
  return newUser._doc;
};

module.exports = register;
