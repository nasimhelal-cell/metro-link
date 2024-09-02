const AppError = require("./AppError");
const { StatusCodes } = require("http-status-codes");

function notFound(error = "Resource not found") {
  throw new AppError(error, StatusCodes.NOT_FOUND);
}

module.exports = notFound;
