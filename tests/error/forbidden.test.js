const { StatusCodes } = require("http-status-codes");
const AppError = require("@/error/AppError");
const forbidden = require("@/error/forbidden");

jest.mock("../../src/error/AppError");

describe("forbidden", () => {
  it("should throw an forbidden error with error message and status code", () => {
    const errorMessage = "Permission denied";
    try {
      forbidden();
    } catch (error) {
      expect(AppError).toHaveBeenCalledWith(
        errorMessage,
        StatusCodes.FORBIDDEN
      );
    }
  });

  it("should throw an forbidden error with error message and status code", () => {
    const customErrorMessage = "custom error message";
    try {
      forbidden(customErrorMessage);
    } catch (error) {
      expect(AppError).toHaveBeenCalledWith(
        customErrorMessage,
        StatusCodes.FORBIDDEN
      );
    }
  });
});
