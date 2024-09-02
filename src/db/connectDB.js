const mongoose = require("mongoose");

async function connectDB(server) {
  const port = +process.env.PORT || 4000;
  const dbUrl = process.env.DB_URL;

  try {
    await mongoose.connect(dbUrl);
    console.log("Database is connected !!! ✅");

    server.listen(port, () => {
      console.log(
        "Server is listening at port: " +
          port +
          ` | Base url is - http://localhost:${port}`
      );
    });
  } catch (error) {
    console.log("Failed to connect with database! ❌");
  }
}

module.exports = connectDB;
