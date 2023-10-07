const { Schema, default: mongoose } = require("mongoose");
const { ErrorCodes } = require("../constants");

const commentSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: [true, ErrorCodes.REQUIRED],
    },
    text: {
      type: Schema.Types.String,
      required: [true, ErrorCodes.REQUIRED],
      maxLength: [500, ErrorCodes.TOO_LONG],
      trim: true,
    },
    book: {
      type: Schema.Types.ObjectId,
      ref: "book",
    },
  },
  {
    timestamps: true,
  }
);

commentSchema.index({ book: 1 });

const Comment = mongoose.model("comment", commentSchema);

module.exports = {
  commentSchema,
  Comment,
};
