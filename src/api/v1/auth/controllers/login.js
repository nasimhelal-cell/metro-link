const { StatusCodes } = require("http-status-codes");
const { catchAsync } = require("@/utils");
const authServices = require("@/lib/auth");

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  const token = await authServices.login({ email, password });

  const response = {
    code: StatusCodes.OK,
    message: "Login successful",
    data: { token },
  };

  res.status(StatusCodes.OK).json(response);
});

module.exports = login;
