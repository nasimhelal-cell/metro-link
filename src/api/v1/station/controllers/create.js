const { StatusCodes } = require("http-status-codes");
const { catchAsync } = require("@/utils");
const { createStation } = require("../../../../lib/station");

const create = catchAsync(async (req, res) => {
  const { name, location } = req.body;

  const station = await createStation({ name, location });

  const response = {
    code: StatusCodes.OK,
    message: "create successful",
    data: station,
  };

  res.status(StatusCodes.OK).json(response);
});

module.exports = create;
