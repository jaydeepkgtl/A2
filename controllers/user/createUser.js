const {
  UserModel: { User },
} = require("../../models");
const { StatusCodes, ReasonPhrases } = require("http-status-codes");

const createUser = async (req, resp) => {
  try {
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      rights: req.body.rights,
    });
    await newUser.save();
    resp.status(StatusCodes.CREATED).json(newUser.stripped());
  } catch (err) {
    resp.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: err.message ?? ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
  }
};

module.exports = createUser;
