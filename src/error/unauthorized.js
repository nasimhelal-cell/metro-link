const AppError = require("./AppError");
const { StatusCodes } = require("http-status-codes");

function unauthorized(error = "User is not authorized") {
  throw new AppError(error, StatusCodes.UNAUTHORIZED);
}

module.exports = unauthorized;
