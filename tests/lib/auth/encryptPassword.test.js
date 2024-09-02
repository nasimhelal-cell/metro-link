const bcrypt = require("bcrypt");
const { encryptPassword } = require("@/lib/auth");

jest.mock("bcrypt");

describe("encryptPassword", () => {
  const plainPassword = "mySecretPassword";
  const saltRounds = 10;

  it("should hash the password correctly", async () => {
    const hashedPassword = "hashedPassword";
    bcrypt.hash.mockResolvedValue(hashedPassword);

    const result = await encryptPassword(plainPassword, saltRounds);

    expect(result).toBe(hashedPassword);
    expect(bcrypt.hash).toHaveBeenCalledWith(plainPassword, saltRounds);
  });

  it("should throw an error if bcrypt.hash fails", async () => {
    const errorMessage = "Password hashing failed";
    bcrypt.hash.mockRejectedValue(new Error(errorMessage));

    await expect(encryptPassword(plainPassword, saltRounds)).rejects.toThrow(
      errorMessage
    );
  });
});
