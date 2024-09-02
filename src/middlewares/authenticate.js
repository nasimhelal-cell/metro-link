const { forbidden } = require("@/error");
const { decodeToken } = require("@/lib/auth");
const { catchAsync } = require("@/utils");
const userServices = require("@/lib/user");

const authenticate = catchAsync(async (req, _res, next) => {
  const token = req.headers?.authorization?.split(" ").at(1);
  const decodedUser = decodeToken(token);

  const user = await userServices.findUser({ email: decodedUser?.email });

  if (!user) return forbidden("Authentication failed");
  req.user = { ...user, userID: user._id };
  next();
});

module.exports = authenticate;
