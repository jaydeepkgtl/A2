const {
  UserModel: { User },
} = require("../models");

const LocalStrategy = require("passport-local").Strategy;

const localStrategy = new LocalStrategy(async function (
  username,
  password,
  done
) {
  try {
    const user = await User.findOne({ name: username }).exec();
    if (!user) {
      return done(null, false);
    }
    if (!user.verifyPassword(password)) {
      return done(null, false);
    }
    done(null, user.stripped());
  } catch (err) {
    done(err);
  }
});

module.exports = localStrategy;
