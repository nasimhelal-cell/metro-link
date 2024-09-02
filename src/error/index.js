const badRequest = require("./badRequest");
const defaultError = require("./defaultError");
const forbidden = require("./forbidden");
const notFound = require("./notFound");
const unauthorized = require("./unauthorized");

module.exports = {
  defaultError,
  notFound,
  badRequest,
  unauthorized,
  forbidden,
};
