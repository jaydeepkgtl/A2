const { ErrorCodes } = require("../../constants");
const {
  BookModel: { Book },
} = require("../../models");
const { StatusCodes, ReasonPhrases } = require("http-status-codes");

const uploadImg = async (req, resp) => {
  try {
    const bookId = req.params?.bookId;
    const file = req.file;

    if (!bookId) {
      return resp.status(StatusCodes.NOT_FOUND).json({
        error: ErrorCodes.INVALID_BOOK_ID,
      });
    }
    const book = await Book.findById(bookId).exec();
    if (!book) {
      return resp.status(StatusCodes.NOT_FOUND).json({
        error: ErrorCodes.INVALID_BOOK_ID,
      });
    }
    book.coverImg = file.filename;
    const updatedBook = await book.save();
    resp.status(StatusCodes.OK).json({
      ...updatedBook._doc,
      coverImg: `${process.env.STATIC_ENDPOINT}/${updatedBook.coverImg}`,
    });
  } catch (err) {
    resp
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(err.message ?? ReasonPhrases.INTERNAL_SERVER_ERROR);
  }
};

module.exports = uploadImg;
