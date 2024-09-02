const { catchAsync } = require("@/utils");

describe("catchAsync", () => {
  it("should call the provided function with req, res, and next", async () => {
    const req = {};
    const res = {};
    const next = jest.fn();
    const fn = jest.fn().mockResolvedValue();

    const wrapFunction = catchAsync(fn);
    await wrapFunction(req, res, next);

    expect(fn).toHaveBeenCalledWith(req, res, next);
    expect(next).not.toHaveBeenCalled();
  });

  it("should call next with an error if the provided function throws", async () => {
    const req = {};
    const res = {};
    const next = jest.fn();
    const error = new Error("test error");
    const fn = jest.fn().mockRejectedValue(error);

    const wrapFunction = catchAsync(fn);
    await wrapFunction(req, res, next);

    expect(fn).toHaveBeenCalledWith(req, res, next);
    expect(next).toHaveBeenCalledWith(error);
  });
});
