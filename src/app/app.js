const express = require("express");
const YAML = require("yamljs");
const swaggerUI = require("swagger-ui-express");

const { defaultError } = require("../error");
const { middleware } = require("./middleware");
const defaultRouter = require("./route");

const swaggerDocs = YAML.load("./filehive.yaml");

const app = express();

app.use(middleware);
app.use(defaultRouter);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));
app.use(defaultError);

module.exports = app;
