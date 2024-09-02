const AppError = require("./AppError");
const { StatusCodes } = require("http-status-codes");

function badRequest(error = "Bad Request") {
  throw new AppError(error, StatusCodes.BAD_REQUEST);
}

module.exports = badRequest;
