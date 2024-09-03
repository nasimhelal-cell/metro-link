const { StatusCodes } = require("http-status-codes");
const { catchAsync } = require("@/utils");

const create = catchAsync(async (req, res) => {
  const { name, stops } = req.body;

  // Validate required fields
  if (!name || !stops || !Array.isArray(stops) || stops.length === 0) {
    return res
      .status(400)
      .json({ error: "Please provide a valid train name and stops." });
  }

  // Validate that each stop has the required fields and that the station exists
  for (let stop of stops) {
    const { station, arrivalTime, departureTime } = stop;

    if (!station || !arrivalTime || !departureTime) {
      return res.status(400).json({
        error:
          "Each stop must include station, arrivalTime, and departureTime.",
      });
    }

    // Check if the station exists in the database
    const stationExists = await Station.findById(station);
    if (!stationExists) {
      return res
        .status(404)
        .json({ error: `Station with ID ${station} not found.` });
    }
  }

  // Create the new train schedule
  const newTrain = new Train({ name, stops });

  // Schedule notifications for train arrivals
  newTrain.scheduleArrivals();

  // Save the train schedule to the database
  const savedTrain = await newTrain.save();

  // Return the newly created train schedule

  const response = {
    code: StatusCodes.OK,
    message: "create successful",
    data: { savedTrain },
  };

  res.status(StatusCodes.OK).json(response);
});

module.exports = create;
