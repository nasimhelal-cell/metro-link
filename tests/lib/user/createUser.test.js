const { badRequest } = require("@/error");
const { createUser, findUser } = require("@/lib/user");
const register = require("@/lib/auth/register");

jest.mock("../../../src/error");
jest.mock("../../../src/lib/user");

describe("register service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should throw an error if required fields are missing", async () => {
    await register({ name: "", email: "", password: "" });

    expect(badRequest).toHaveBeenCalledWith(
      "One or more credentials are missing"
    );
  });

  it("should throw an error if user already exists", async () => {
    findUser.mockResolvedValueOnce({ email: "exists@example.com" });

    await register({
      name: "test-name",
      email: "exists@example.com",
      password: "password",
    });

    expect(badRequest).toHaveBeenCalledWith(
      "User already exists, Try with another email"
    );
  });

  it("should create a new user if all fields are valid", async () => {
    findUser.mockResolvedValueOnce(null);

    createUser.mockResolvedValueOnce({
      _doc: {
        name: "test-name",
        email: "test@example.com",
        walletBalance: 100,
        tickets: [],
      },
    });

    const result = await register({
      name: "test-name",
      email: "test@example.com",
      password: "password",
      walletBalance: 100,
      tickets: [],
    });

    expect(createUser).toHaveBeenCalledWith({
      name: "test-name",
      email: "test@example.com",
      password: "password",
      walletBalance: 100,
      tickets: [],
    });

    expect(result).toEqual({
      name: "test-name",
      email: "test@example.com",
      walletBalance: 100,
      tickets: [],
    });
  });

  it("should create a new user with default walletBalance and tickets if not provided", async () => {
    findUser.mockResolvedValueOnce(null);

    createUser.mockResolvedValueOnce({
      _doc: {
        name: "test-name",
        email: "test@example.com",
        walletBalance: 0, // Assuming 0 is the default value in your app
        tickets: [],
      },
    });

    const result = await register({
      name: "test-name",
      email: "test@example.com",
      password: "password",
    });

    expect(createUser).toHaveBeenCalledWith({
      name: "test-name",
      email: "test@example.com",
      password: "password",
      walletBalance: undefined,
      tickets: undefined,
    });

    expect(result).toEqual({
      name: "test-name",
      email: "test@example.com",
      walletBalance: 0,
      tickets: [],
    });
  });
});
