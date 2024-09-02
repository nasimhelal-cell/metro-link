const defaultRouter = require("express").Router();
const router = require("../routes");

defaultRouter.use("/api", router);

module.exports = defaultRouter;
