const {
  BookModel: { Book },
} = require("../../models");
const { ErrorCodes } = require("../../constants");
const { StatusCodes, ReasonPhrases } = require("http-status-codes");

const updateBook = async (req, resp) => {
  try {
    const bookId = req.params?.id;
    const newProperties = req.body;
    const updatedBook = await Book.findOneAndUpdate(
      { _id: bookId },
      newProperties,
      {
        new: true,
      }
    ).exec();
    if (!updatedBook) {
      return resp.status(StatusCodes.NOT_FOUND).json({
        error: ErrorCodes.INVALID_BOOK_ID,
      });
    }
    resp.status(StatusCodes.OK).json(updatedBook);
  } catch (err) {
    resp
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(err.message ?? ReasonPhrases.INTERNAL_SERVER_ERROR);
  }
};
module.exports = updateBook;
