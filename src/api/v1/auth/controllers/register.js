const { StatusCodes } = require("http-status-codes");
const authServices = require("@/lib/auth");
const { catchAsync } = require("@/utils");

const register = catchAsync(async (req, res) => {
  const { name, email, password, walletBalance, tickets } = req.body;

  let user = await authServices.register({
    name,
    email,
    password,
    walletBalance,
    tickets,
  });

  const response = {
    code: StatusCodes.CREATED,
    message: "User registered successfully",
    data: user,
  };

  res.status(StatusCodes.CREATED).json(response);
});

module.exports = register;
