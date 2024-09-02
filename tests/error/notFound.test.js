const { StatusCodes } = require("http-status-codes");
const AppError = require("@/error/AppError");
const notFound = require("@/error/notFound");

jest.mock("../../src/error/AppError");

describe("notFound", () => {
  it("should throw an error with error message and status code", () => {
    const errorMessage = "Resource not found";

    try {
      notFound();
    } catch (error) {
      expect(AppError).toHaveBeenCalledWith(
        errorMessage,
        StatusCodes.NOT_FOUND
      );
      expect(error).toBeInstanceOf(AppError);
    }
  });

  it("should throw an error with custom error message and status code", () => {
    const customErrorMessage = "custom error message";

    try {
      notFound(customErrorMessage);
    } catch (error) {
      expect(AppError).toHaveBeenCalledWith(
        customErrorMessage,
        StatusCodes.NOT_FOUND
      );
      expect(error).toBeInstanceOf(AppError);
    }
  });
});
