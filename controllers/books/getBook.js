const { Types } = require("mongoose");
const { ErrorCodes } = require("../../constants");
const {
  BookModel: { Book },
  CommentModel: { Comment },
} = require("../../models");
const { StatusCodes, ReasonPhrases } = require("http-status-codes");

const getBook = async (req, resp) => {
  try {
    const bookId = req.params?.id;
    if (!bookId) {
      return resp.status(StatusCodes.NOT_FOUND).json({
        error: ErrorCodes.INVALID_BOOK_ID,
      });
    }

    const [books, comments] = await Promise.all([
      Book.findById(bookId).exec(),
      Comment.find({ book: new Types.ObjectId(bookId) }).exec(),
    ]);

    // const books = await Book.findById(bookId).exec();
    // const comments = await Comment.find({ book: new Types.ObjectId(bookId) }).exec();

    if (!book) {
      return resp.status(StatusCodes.NOT_FOUND).json({
        error: ErrorCodes.INVALID_BOOK_ID,
      });
    }
    resp.status(StatusCodes.OK).json({
      ...book._doc,
      coverImg: `${process.env.STATIC_ENDPOINT}/${book.coverImg}`,
    });
  } catch (err) {
    resp
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(err.message ?? ReasonPhrases.INTERNAL_SERVER_ERROR);
  }
};

module.exports = getBook;
