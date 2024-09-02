const { StatusCodes } = require("http-status-codes");
const AppError = require("@/error/AppError");
const DBValidationError = require("@/error/DBValidationError");

jest.mock("../../src/error/AppError");

describe("DBValidationError", () => {
  it("should return an DBValidationError with correct message and status code", () => {
    const mockError = {
      errors: {
        name: { message: "Name is required" },
        email: { message: "Email is not valid" },
      },
    };

    const expectedMessage =
      "Invalid input data. Name is required | Email is not valid";

    DBValidationError(mockError);
    expect(AppError).toHaveBeenCalledWith(
      expectedMessage,
      StatusCodes.BAD_REQUEST
    );
  });

  it("should return an AppError with a single error message", () => {
    const mockError = {
      errors: {
        password: { message: "Password must be at least 6 characters long" },
      },
    };

    const expectedMessage =
      "Invalid input data. Password must be at least 6 characters long";

    DBValidationError(mockError);

    expect(AppError).toHaveBeenCalledWith(
      expectedMessage,
      StatusCodes.BAD_REQUEST
    );
  });

  it("should handle an empty errors object", () => {
    const mockError = {
      errors: {},
    };

    const expectedMessage = "Invalid input data. ";

    DBValidationError(mockError);

    expect(AppError).toHaveBeenCalledWith(
      expectedMessage,
      StatusCodes.BAD_REQUEST
    );
  });
});
