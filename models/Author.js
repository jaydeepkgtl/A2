const { Schema, default: mongoose } = require("mongoose");
const validator = require("validator");
const { ErrorCodes } = require("../constants");

const authorSchema = new Schema(
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
    website: {
      type: Schema.Types.String,
      validate: {
        validator: (url) => {
          return validator.isURL(url);
        },
        message: ErrorCodes.INVALID_URL,
      },
    },
  },
  {
    timestamps: true,
  }
);

const Author = mongoose.model("author", authorSchema);

module.exports = {
  authorSchema,
  Author,
};
