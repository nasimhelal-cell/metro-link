const { Train, Station } = require("@/models");
const { badRequest } = require("@/error");

const createSchedule = async ({ name, stops }) => {
  // Validate the input
  if (!name || !stops || !Array.isArray(stops) || stops.length === 0) {
    return badRequest(
      "Name and stops are required, and stops must be a non-empty array"
    );
  }

  // Validate each stop
  for (const stop of stops) {
    const { station, arrivalTime, departureTime } = stop;

    // Ensure all necessary fields are present
    if (!station || !arrivalTime || !departureTime) {
      return badRequest(
        "Each stop must include station, arrivalTime, and departureTime"
      );
    }

    // Check if the station exists
    const stationExists = await Station.findById(station);
    if (!stationExists) {
      return badRequest(`Station with ID ${station} not found`);
    }

    // Validate arrivalTime and departureTime
    if (new Date(arrivalTime) >= new Date(departureTime)) {
      return badRequest(
        "Departure time must be after arrival time for each stop"
      );
    }
  }

  // Create the new train schedule
  const train = new Train({ name, stops });

  // Schedule the arrival notifications
  train.scheduleArrivals();

  // Save the train schedule to the database
  return train.save();
};

module.exports = createSchedule;
