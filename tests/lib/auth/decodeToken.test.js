const jwt = require("jsonwebtoken");
const { badRequest } = require("@/error");
const { decodeToken } = require("@/lib/auth");

jest.mock("jsonwebtoken", () => ({
  verify: jest.fn(),
}));
jest.mock("../../../src/error");

describe("decodeToken", () => {
  const token = "mocked_token";
  const secret = "mocked_secret";
  const decodedData = { id: 1, email: "test@example.com" };

  beforeEach(() => {
    process.env.JWT_SECRET = secret;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return decoded data when the token is valid", () => {
    jwt.verify.mockReturnValue(decodedData);

    const result = decodeToken(token);

    expect(jwt.verify).toHaveBeenCalledWith(token, secret);
    expect(result).toEqual(decodedData);
  });

  it("should return badRequest when the token is invalid", () => {
    jwt.verify.mockImplementation(() => {
      throw new Error("Invalid token");
    });

    const result = decodeToken(token);

    expect(jwt.verify).toHaveBeenCalledWith(token, secret);
    expect(result).toEqual(badRequest("Not a valid token"));
  });
});
