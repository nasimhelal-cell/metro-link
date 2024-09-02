const AppError = require("./AppError");
const { StatusCodes } = require("http-status-codes");

function DBValidationError(err) {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data. ${errors.join(" | ")}`;
  return new AppError(message, StatusCodes.BAD_REQUEST);
}

module.exports = DBValidationError;
