const User = require("../models/userModel");

const ErrorHandelar = require("../special/errorHandelar");

const isAdminCheak = (...roles) => {
  return async (req, res, next) => {
    try {
      if (!roles.includes(req.user.role)) {
        return next(
          new ErrorHandelar(
            `Hii: ${req.userName} you are not allowed to access this resouce `,
            404
          )
        );
      }
      next();
    } catch (error) {
      console.log(`this error from isAdminCheak ${error}`);
      next(error);
    }
  };
};
module.exports = { isAdminCheak };
