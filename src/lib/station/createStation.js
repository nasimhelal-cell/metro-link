const { Station } = require("@/models");
const { badRequest } = require("@/error");

const createStation = async ({ name, location }) => {
  // Validate the input
  if (!name || !location) {
    return badRequest("Name and location are required");
  }

  // Check if the station already exists
  const existingStation = await Station.findOne({ name });
  if (existingStation) {
    return badRequest("Station with this name already exists");
  }

  // Create the new station
  const station = new Station({ name, location });
  return station.save();
};

module.exports = createStation;
