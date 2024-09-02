const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const middleware = [
  morgan("dev"),
  cors({ origin: "http://localhost:3000", credentials: true }),
  express.json(),
  cookieParser(),
];

module.exports = { middleware };
