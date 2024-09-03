const { StatusCodes } = require("http-status-codes");
const { catchAsync } = require("@/utils");
const { createSchedule } = require("../../../../lib/train");

const createTrainSchedule = catchAsync(async (req, res) => {
  const { name, stops } = req.body;
  const train = await createSchedule({ name, stops });

  const response = {
    code: StatusCodes.OK,
    message: "createSchedule successful",
    data: train,
  };

  res.status(StatusCodes.OK).json(response);
});

module.exports = createTrainSchedule;
