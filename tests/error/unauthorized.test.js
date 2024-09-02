const { StatusCodes } = require("http-status-codes");
const AppError = require("@/error/AppError");
const unauthorized = require("@/error/unauthorized");

jest.mock("../../src/error/AppError");

describe("unauthorized", () => {
  it("should throw an unauthorized error with error message and status code", () => {
    const errorMessage = "User is not authorized";
    try {
      unauthorized();
    } catch (error) {
      expect(AppError).toHaveBeenCalledWith(
        errorMessage,
        StatusCodes.UNAUTHORIZED
      );
    }
  });

  it("should throw an unauthorized error with error message and status code", () => {
    const customErrorMessage = "custom error message";
    try {
      unauthorized(customErrorMessage);
    } catch (error) {
      expect(AppError).toHaveBeenCalledWith(
        customErrorMessage,
        StatusCodes.UNAUTHORIZED
      );
    }
  });
});
