const mongoose = require("mongoose");
const { connectDB } = require("@/db");

jest.mock("mongoose", () => ({
  connect: jest.fn(),
}));

describe("connectDB", () => {
  let server;

  beforeEach(() => {
    server = {
      listen: jest.fn((port, callback) => callback()),
    };
    process.env.PORT = "4000";
    process.env.DB_URL = "mongodb://localhost:27017/filehive";
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should connect to the database and start the server successfully", async () => {
    mongoose.connect.mockResolvedValueOnce();

    const consoleLogSpy = jest.spyOn(console, "log");

    await connectDB(server);

    expect(mongoose.connect).toHaveBeenCalledWith(process.env.DB_URL);
    expect(consoleLogSpy).toHaveBeenCalledWith("Database is connected !!! ✅");
    expect(server.listen).toHaveBeenCalledWith(4000, expect.any(Function));
    expect(consoleLogSpy).toHaveBeenCalledWith(
      "Server is listening at port: 4000 | Base url is - http://localhost:4000"
    );

    consoleLogSpy.mockRestore();
  });

  it("should log an error message if database connection fails", async () => {
    mongoose.connect.mockRejectedValueOnce(new Error("Failed to connect"));

    const consoleLogSpy = jest.spyOn(console, "log");

    await connectDB(server);

    expect(mongoose.connect).toHaveBeenCalledWith(process.env.DB_URL);
    expect(consoleLogSpy).toHaveBeenCalledWith(
      "Failed to connect with database! ❌"
    );
    expect(server.listen).not.toHaveBeenCalled();

    consoleLogSpy.mockRestore();
  });
});
