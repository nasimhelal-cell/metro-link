const { Schema, model } = require("mongoose");

const ticketSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    train: {
      type: Schema.Types.ObjectId,
      ref: "Train",
      required: true,
    },
    startStation: {
      type: Schema.Types.ObjectId,
      ref: "Station",
      required: true,
    },
    endStation: {
      type: Schema.Types.ObjectId,
      ref: "Station",
      required: true,
    },
    fare: {
      type: Number,
      required: true,
    },
    purchaseDate: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Ticket = model("Ticket", ticketSchema);
module.exports = Ticket;
