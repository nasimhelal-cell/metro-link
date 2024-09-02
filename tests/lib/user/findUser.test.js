const { findUser } = require("@/lib/user");
const { User } = require("@/models");

jest.mock("../../../src/models", () => ({
  User: {
    findOne: jest.fn(),
  },
}));

describe("findUser", () => {
  afterEach(() => jest.clearAllMocks());

  it("should return user when user is found", async () => {
    const mockUser = {
      _doc: {
        email: "test@example.com",
        name: "test user",
      },
    };
    User.findOne.mockResolvedValue(mockUser);

    const result = await findUser({ email: "test@example.com" });

    expect(result).toEqual(mockUser._doc);
    expect(User.findOne).toHaveBeenCalledWith({ email: "test@example.com" });
  });

  it("should return false when user is not found", async () => {
    User.findOne.mockResolvedValue(null);

    const result = await findUser({ email: "notfound@example.com" });

    expect(User.findOne).toHaveBeenCalledWith({
      email: "notfound@example.com",
    });
    expect(result).toBe(false);
  });

  it("should handle errors thrown by User.findOne", async () => {
    User.findOne.mockRejectedValue(new Error("Database error"));

    await expect(findUser({ email: "error@example.com" })).rejects.toThrow(
      "Database error"
    );

    expect(User.findOne).toHaveBeenCalledWith({ email: "error@example.com" });
  });
});
