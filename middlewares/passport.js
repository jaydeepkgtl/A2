const { ReasonPhrases, StatusCodes } = require("http-status-codes");
const { StatusMessages, ErrorCodes } = require("../constants");

const checkAuthenticated = (req, resp, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  resp.status(StatusCodes.UNAUTHORIZED).json({
    error: ReasonPhrases.UNAUTHORIZED,
  });
};

const checkIsLoggedIn = (req, resp, next) => {
  if (req.isAuthenticated()) {
    return resp.status(StatusCodes.OK).json({
      error: StatusMessages.USER_ALREADY_LOGGED_IN,
    });
  }
  next();
};

const hasAllAccessRights = (rights) => (req, resp, next) => {
  const user = req.user;
  if (user?.rights && rights.every((right) => user.rights.includes(right))) {
    return next();
  }
  return resp.status(StatusCodes.FORBIDDEN).json({
    error: ErrorCodes.INSUFFICIENT_RIGHTS,
  });
};

module.exports = {
  checkAuthenticated,
  checkIsLoggedIn,
  hasAllAccessRights,
};
