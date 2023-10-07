const { ErrorCodes } = require("../../constants");
const {
  BookModel: { Book },
} = require("../../models");
const { StatusCodes, ReasonPhrases } = require("http-status-codes");

const deleteBook = async (req, resp) => {
  try {
    const bookId = req.params?.id;
    if (!bookId) {
      return resp.status(StatusCodes.NOT_FOUND).json({
        error: ErrorCodes.INVALID_BOOK_ID,
      });
    }
    const book = await Book.findOneAndDelete({ ISBN: bookId }).exec();
    if (!book) {
      return resp.status(StatusCodes.NOT_FOUND).json({
        error: ErrorCodes.INVALID_BOOK_ID,
      });
    }
    resp.status(StatusCodes.OK).json(book);
  } catch (err) {
    resp
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(err.message ?? ReasonPhrases.INTERNAL_SERVER_ERROR);
  }
};

module.exports = deleteBook;
