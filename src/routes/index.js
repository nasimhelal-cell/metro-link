const router = require("express").Router();
const { controllers: authControllers } = require("@/api/v1/auth");
const { authenticate } = require("@/middlewares");

// auth
router.route("/v1/auth/register").post(authControllers.register);
router.route("/v1/auth/login").post(authControllers.login);
router.route("/v1/auth/logout").post(authenticate, authControllers.logout);

//completed up

// station
// router
//   .route("/v1/stations/create")
//   .post(authenticate, folderControllers.create);
// router.route("/v1/stations").get(authenticate, folderControllers.create);
// router
//   .route("/v1/stations/rename/:id")
//   .patch(authenticate, folderControllers.rename);

// // train
// router.route("/v1/trains/create").post(authenticate, folderControllers.create);
// router.route("/v1/trains").get(authenticate, folderControllers.create);
// router
//   .route("/v1/trains/update-schedule/:id")
//   .patch(authenticate, folderControllers.rename);

// // wallet
// router.route("/v1/wallet/add").post(authenticate, folderControllers.create);
// router.route("/v1/wallet").get(authenticate, folderControllers.create);

// // ticket
// router
//   .route("/v1/tickets/purchase")
//   .post(authenticate, folderControllers.create);
// router.route("/v1/tickets").get(authenticate, folderControllers.create);

module.exports = router;
