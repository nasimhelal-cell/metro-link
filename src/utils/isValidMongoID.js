const mongoose = require("mongoose");
const {
  Types: { ObjectId },
} = mongoose;

const isValidMongoID = (id) =>
  ObjectId.isValid(id) && new ObjectId(id).toString() === id;

module.exports = isValidMongoID;
