const { generateToken } = require("@/lib/auth");
const jwt = require("jsonwebtoken");

jest.mock("jsonwebtoken");

describe("generateToken", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.clearAllMocks();
    process.env = { ...originalEnv };
    process.env.JWT_SECRET = "testSecret";
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it("should generate and return a JWT token with provided data and default algorithm", async () => {
    const mockInputData = { email: "test@example.com", role: "user" };
    const mockToken = "mockedJwtToken";
    const algorithm = "HS256";

    // Mocking jwt.sign to return a token
    jwt.sign.mockReturnValueOnce(mockToken);

    const token = generateToken({ data: mockInputData });

    expect(jwt.sign).toHaveBeenCalledWith(mockInputData, "testSecret", {
      algorithm,
    });
    expect(token).toBe(mockToken);
  });

  it("should generate and return a JWT token with a custom algorithm", async () => {
    const mockInputData = { email: "test@example.com", role: "admin" };
    const mockToken = "mockedJwtToken";
    const algorithm = "RS256";

    // Mocking jwt.sign to return a token
    jwt.sign.mockReturnValueOnce(mockToken);

    const token = generateToken({ data: mockInputData, algorithm });

    expect(jwt.sign).toHaveBeenCalledWith(mockInputData, "testSecret", {
      algorithm,
    });
    expect(token).toBe(mockToken);
  });

  it("should throw an error if jwt.sign fails", async () => {
    const mockInputData = { email: "test@example.com", role: "user" };
    const mockError = new Error("Error in generating token");

    // Mocking jwt.sign to throw an error
    jwt.sign.mockImplementationOnce(() => {
      throw mockError;
    });

    await expect(() => generateToken({ data: mockInputData })).toThrow(
      "Error in generating token"
    );

    expect(jwt.sign).toHaveBeenCalledWith(mockInputData, "testSecret", {
      algorithm: "HS256",
    });
  });
});
