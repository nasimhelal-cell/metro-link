const AppError = require("@/error/AppError");

describe("AppError", () => {
  beforeAll(() =>
    jest.spyOn(Error, "captureStackTrace").mockImplementation(() => {})
  );

  afterAll(() => jest.restoreAllMocks());

  it("should create an AppError instance with the correct properties", () => {
    const message = "Test error message";
    const code = 404;

    const error = new AppError(message, code);

    expect(error.message).toBe(message);
    expect(error.code).toBe(code);
    expect(error.constant).toBe("fail");
    expect(error.isOperational).toBe(true);
    expect(Error.captureStackTrace).toHaveBeenCalledWith(
      error,
      error.constructor
    );
  });

  it("should set the correct constant for server errors (code=>500)", () => {
    const message = "Test server error";
    const code = 500;
    const error = new AppError(message, code);

    expect(error.constant).toBe("error");
  });
});
