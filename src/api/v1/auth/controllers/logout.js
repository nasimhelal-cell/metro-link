const { StatusCodes } = require("http-status-codes");
const { catchAsync } = require("@/utils");
const userServices = require("@/lib/user");
const authServices = require("@/lib/auth");
const { badRequest } = require("@/error");

const logout = catchAsync(async (req, res) => {
  let { email, password } = req.body;
  const user = await userServices.findUser({ email });

  if (!user) {
    return badRequest("User not found with this email, Try with another email");
  }
  const newPassword = await authServices.isVerifiedPassword(
    password,
    user.password
  );
  if (!newPassword) {
    return badRequest("Password is not matched");
  }

  const response = {
    code: StatusCodes.OK,
    message: "Logout successful",
  };
  res.status(StatusCodes.OK).json(response);
});

module.exports = logout;
