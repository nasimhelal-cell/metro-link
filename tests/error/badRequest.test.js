const { StatusCodes } = require("http-status-codes");
const AppError = require("@/error/AppError");
const badRequest = require("@/error/badRequest");

jest.mock("../../src/error/AppError");

describe("badRequest", () => {
  it("should throw an AppError with the default message and status code", () => {
    const errorMessage = "Bad Request";
    try {
      badRequest();
    } catch (error) {
      expect(AppError).toHaveBeenCalledWith(
        errorMessage,
        StatusCodes.BAD_REQUEST
      );
      expect(error).toBeInstanceOf(AppError);
    }
  });

  it("should throw an AppError with custom error", () => {
    const customMessage = "Custom error message";

    try {
      badRequest(customMessage);
    } catch (error) {
      expect(AppError).toHaveBeenCalledWith(
        customMessage,
        StatusCodes.BAD_REQUEST
      );
      expect(error).toBeInstanceOf(AppError);
    }
  });
});
