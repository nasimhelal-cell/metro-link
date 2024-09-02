const AppError = require("./AppError");
const { StatusCodes } = require("http-status-codes");

function forbidden(error = "Permission denied") {
  throw new AppError(error, StatusCodes.FORBIDDEN);
}

module.exports = forbidden;
