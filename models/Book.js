const { Schema, default: mongoose } = require("mongoose");
const { authorSchema } = require("./Author");
const { ErrorCodes } = require("../constants");

const bookSchema = new Schema(
  {
    name: {
      type: Schema.Types.String,
      required: [true, ErrorCodes.REQUIRED],
      maxLength: [100, ErrorCodes.TOO_LONG],
      trim: true,
    },
    author: authorSchema,
    description: {
      type: Schema.Types.String,
      maxLength: [1000, ErrorCodes.TOO_LONG],
      trim: true,
    },
    publishedYear: {
      type: Schema.Types.Number,
    },
    ISBN: {
      type: Schema.Types.String,
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "category",
    },
    coverImg: {
      type: Schema.Types.String,
    },
  },
  {
    timestamps: true,
  }
);

bookSchema.index({ name: "text" });
bookSchema.index({ ISBN: 1 }, { unique: true });
bookSchema.index({ category: 1 });

const Book = mongoose.model("book", bookSchema);

module.exports = {
  bookSchema,
  Book,
};
