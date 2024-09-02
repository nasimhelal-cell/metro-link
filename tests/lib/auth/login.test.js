const { notFound, badRequest } = require("@/error");
const generateToken = require("@/lib/auth/generateToken");
const isVerifiedPassword = require("@/lib/auth/isVerifiedPassword");
const authServices = require("@/lib/auth");
const { findUser } = require("@/lib/user");

jest.mock("../../../src/lib/user");
jest.mock("../../../src/error");
jest.mock("../../../src/lib/auth/isVerifiedPassword");
jest.mock("../../../src/lib/auth/generateToken");

describe("login service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should throw not found error if user is not found", async () => {
    findUser.mockResolvedValueOnce(null);
    await authServices.login({
      email: "test@example.com",
      password: "test-password",
    });

    expect(notFound).toHaveBeenCalledWith(
      "You are not registered. Please register first."
    );
  });

  it("should throw bad request error if password is incorrect", async () => {
    findUser.mockResolvedValueOnce({
      email: "test@example.com",
      password: "test-password",
    });
    isVerifiedPassword.mockResolvedValueOnce(false);

    await authServices.login({
      email: "test@example.com",
      password: "test-password",
    });

    expect(badRequest).toHaveBeenCalledWith(`Invalid credentials`);
  });

  it("should generate and return token if login", async () => {
    const mockUser = { email: "test@example.com", password: "hashed-password" };
    findUser.mockResolvedValueOnce(mockUser);

    isVerifiedPassword.mockResolvedValueOnce(true);

    const mockToken = "mockToken";
    generateToken.mockResolvedValueOnce(mockToken);

    const token = await authServices.login({
      email: "test@example.com",
      password: "correctPassword",
    });

    expect(generateToken).toHaveBeenCalledWith({ data: mockUser });
    expect(token).toBe(mockToken);
  });
});
