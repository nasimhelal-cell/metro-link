const mongoose = require("mongoose");
const nodeCron = require("node-cron");

const stopSchema = new mongoose.Schema({
  station: {
    type: mongoose.Schema.Types.ObjectId,
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
  cronJob: {
    type: String, // Stores the cron job identifier
  },
});

const trainSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    stops: [stopSchema],
  },
  { timestamps: true }
);

trainSchema.methods.scheduleArrivals = function () {
  this.stops.forEach((stop) => {
    const arrivalTime = new Date(stop.arrivalTime);
    const notifyTime = new Date(arrivalTime.getTime() - 10 * 60 * 1000); // 10 minutes before arrival

    const cronTime = `${notifyTime.getMinutes()} ${notifyTime.getHours()} ${notifyTime.getDate()} ${
      notifyTime.getMonth() + 1
    } *`;

    const job = nodeCron.schedule(cronTime, () => {
      console.log(
        `Train ${this.name} is arriving at ${stop.station} in 10 minutes!`
      );
      // Here, you could trigger a notification or other actions
    });

    stop.cronJob = job;
  });
};

const Train = mongoose.model("Train", trainSchema);
module.exports = Train;
