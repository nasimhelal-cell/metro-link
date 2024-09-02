const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const DBValidationError = require("./DBValidationError");

function defaultError(error, _req, res, _next) {
  // Handle validation errors
  if (error.name === "ValidationError") {
    error = DBValidationError(error);
  }

  // Set default values if not provided
  error.code = error.code || StatusCodes.INTERNAL_SERVER_ERROR;
  error.constant = error.constant || "error";
  error.message =
    error.message || ReasonPhrases[StatusCodes.INTERNAL_SERVER_ERROR];

  // Construct the error response
  const errorResponse = {
    code: error.code,
    constant: error.constant,
    message: error.message,
  };

  // Send the error response
  res.status(error.code).json(errorResponse);
}

module.exports = defaultError;
