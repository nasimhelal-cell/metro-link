const { notFound, badRequest } = require("@/error");
const userServices = require("../user");
const generateToken = require("./generateToken");
const isVerifiedPassword = require("./isVerifiedPassword");

const login = async ({ email, password }) => {
  const user = await userServices.findUser({ email });

  if (!user) return notFound("You are not registered. Please register first.");

  const isPasswordVerified = await isVerifiedPassword(password, user.password);

  if (!isPasswordVerified) return badRequest(`Invalid credentials`);

  return generateToken({ data: user });
};

module.exports = login;
