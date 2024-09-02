const bcrypt = require("bcrypt");
const { isVerifiedPassword } = require("@/lib/auth");

jest.mock("bcrypt");

describe("isVerifiedPassword function", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return true if the password is correct", async () => {
    bcrypt.compare.mockResolvedValueOnce(true);

    const result = await isVerifiedPassword(
      "correct-password",
      "hashed-password"
    );

    expect(bcrypt.compare).toHaveBeenCalledWith(
      "correct-password",
      "hashed-password"
    );
    expect(result).toBeTruthy();
  });

  it("should return false if the password is wrong", async () => {
    bcrypt.compare.mockResolvedValueOnce(false);

    const result = await isVerifiedPassword(
      "wrong-password",
      "hashed-password"
    );

    expect(bcrypt.compare).toHaveBeenCalledWith(
      "wrong-password",
      "hashed-password"
    );
    expect(result).toBeFalsy();
  });

  it("should throw an error by bcrypt.compare", async () => {
    bcrypt.compare.mockRejectedValueOnce(new Error("bcrypt error"));

    await expect(
      isVerifiedPassword("anyPassword", "hashed-password")
    ).rejects.toThrow("bcrypt error");

    expect(bcrypt.compare).toHaveBeenCalledWith(
      "anyPassword",
      "hashed-password"
    );
  });
});
