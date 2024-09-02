const { Schema, model } = require("mongoose");

const trainSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    stops: [
      {
        station: {
          type: Schema.Types.ObjectId,
          ref: "Station",
          required: true,
        },
        arrivalTime: {
          type: Date,
          required: true,
        },
        departureTime: {
          type: Date,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

const Train = model("Train", trainSchema);
module.exports = Train;
