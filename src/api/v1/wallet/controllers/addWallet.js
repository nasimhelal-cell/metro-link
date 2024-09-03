const { StatusCodes } = require("http-status-codes");
const { catchAsync } = require("@/utils");

const addWallet = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  //  add logic in here

  const response = {
    code: StatusCodes.OK,
    message: "addWallet successful",
    data: { token },
  };

  res.status(StatusCodes.OK).json(response);
});

module.exports = addWallet;
