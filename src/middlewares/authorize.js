const { forbidden } = require("@/error");

const authorize =
  (roles = ["admin"]) =>
  (req, _res, next) => {
    if (roles.includes(req.user.role)) {
      return next();
    }

    return forbidden();
  };

module.exports = authorize;
