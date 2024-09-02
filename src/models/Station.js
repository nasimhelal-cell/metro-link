const { Schema, model } = require("mongoose");

const stationSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    location: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Station = model("Station", stationSchema);
module.exports = Station;
