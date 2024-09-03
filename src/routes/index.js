const router = require("express").Router();
const { controllers: authControllers } = require("@/api/v1/auth");
const { controllers: stationControllers } = require("@/api/v1/station");
const { controllers: trainControllers } = require("@/api/v1/train");
const { controllers: walletControllers } = require("../api/v1/wallet");
const { controllers: ticketControllers } = require("../api/v1/ticket");
const { authenticate } = require("@/middlewares");

// auth
router.route("/v1/auth/register").post(authControllers.register);
router.route("/v1/auth/login").post(authControllers.login);
router.route("/v1/auth/logout").post(authenticate, authControllers.logout);

//completed up

// station
router
  .route("/v1/stations/create")
  .post(authenticate, stationControllers.create);
router.route("/v1/stations").get(authenticate, stationControllers.getStations);
router
  .route("/v1/stations/:id/update-station")
  .patch(authenticate, stationControllers.updateStationInfo);

// train
router.route("/v1/trains/create").post(authenticate, trainControllers.create);
router.route("/v1/trains").get(authenticate, trainControllers.getTrains);
router
  .route("/v1/trains/:id/")
  .patch(authenticate, trainControllers.updateSchedule);

// wallet
router.route("/v1/wallet/add").post(authenticate, walletControllers.addWallet);
router.route("/v1/wallet").get(authenticate, walletControllers.getWallet);

// ticket
router
  .route("/v1/tickets/purchase")
  .post(authenticate, ticketControllers.purchase);
router.route("/v1/tickets").get(authenticate, ticketControllers.tickets);

module.exports = router;
