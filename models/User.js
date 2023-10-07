const { Schema, default: mongoose } = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const { ErrorCodes } = require("../constants");

function hashPassword(next) {
  // if (this.isModified("password")) {
  //   this.password = bcrypt.hashSync(this.password, 10); //  Hashed password
  // }
  next();
}

const userSchema = new Schema(
  {
    name: {
      type: Schema.Types.String,
      required: [true, ErrorCodes.REQUIRED],
      maxLength: [50, ErrorCodes.TOO_LONG],
      trim: true,
    },
    email: {
      type: Schema.Types.String,
      required: true,
      maxLength: 50,
      validate: {
        validator: (email) => {
          return validator.isEmail(email);
        },
        message: ErrorCodes.INVALID_EMAIL,
      },
    },
    password: {
      type: Schema.Types.String,
      required: true,
      minLength: [8, ErrorCodes.TOO_SHORT],
    },
    rights: [
      {
        type: Schema.Types.String,
        enum: ["READ", "WRITE", "ADMIN"],
        default: "READ",
      },
    ],
  },
  {
    timestamps: true,
  }
);

userSchema.methods.verifyPassword = function (inputPassword) {
  return bcrypt.compareSync(inputPassword, this.password);
};

userSchema.methods.stripped = function () {
  const user = this._doc;
  delete user.password;
  return { ...user };
};

userSchema.pre("save", function hashPassword(next) {
  if (this.isModified("password")) {
    this.password = bcrypt.hashSync(this.password, 10); //  Hashed password
  }
  next();
});

userSchema.index({ username: "text" });
userSchema.index({ email: 1 }, { unique: true });

const User = mongoose.model("user", userSchema);

module.exports = {
  userSchema,
  User,
};
