const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const DBValidationError = require("@/error/DBValidationError");
const defaultError = require("@/error/defaultError");

jest.mock("http-status-codes");
jest.mock("../../src/error/DBValidationError");

describe("Default error middleware", () => {
  let res;
  beforeEach(() => {
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it("should handle database validation error by DBValidationError", () => {
    const mockError = new Error("Validation failed");
    mockError.name = "ValidationError";
    let transformError = { code: 400, constant: "validation_error" };
    DBValidationError.mockReturnValue(transformError);

    defaultError(mockError, {}, res, {});

    expect(DBValidationError).toHaveBeenCalledWith(mockError);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(transformError);
  });

  it("should handle default error with code, constant, message by default", () => {
    const mockError = new Error("some error");

    StatusCodes.INTERNAL_SERVER_ERROR = 500;
    ReasonPhrases[500] = "Internal Server Error";

    defaultError(mockError, {}, res, {});

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      code: 500,
      constant: "error",
      message: "some error",
    });
  });
});
