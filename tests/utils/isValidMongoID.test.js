const isValidMongoID = require("@/utils/isValidMongoID");

describe("isValidMongoID", () => {
  it("should return true for a valid mongoDb id ", () => {
    const validID = "507f191e810c19729de860ea";
    expect(isValidMongoID(validID)).toBe(true);
  });

  it("should return false for every falsy values ", () => {
    const falsyValues = [null, undefined, NaN, false, 0];
    falsyValues.forEach((value) => expect(isValidMongoID(value)).toBe(false));
  });

  it("should return false for invalid values ", () => {
    const invalidIDs = [
      "invalidObjectId",
      "507f191e810c19729de860e", // Incorrect length
      "507f191e810c19729de860eG", // Invalid character
      {}, // Non-string value
      [], // Non-string value
    ];
    invalidIDs.forEach((value) => expect(isValidMongoID(value)).toBe(false));
  });
});
