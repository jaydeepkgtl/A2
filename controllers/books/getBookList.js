const { ReasonPhrases, StatusCodes } = require("http-status-codes");
const {
  BookModel: { Book },
} = require("../../models");

const getBookList = async (req, resp) => {
  try {
    const bookList = await Book.find()
      .populate([
        {
          path: "category",
          select: "_id name",
        },
      ])
      .exec();
    resp.status(StatusCodes.OK).json(bookList);
  } catch (err) {
    resp
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(err.message ?? ReasonPhrases.INTERNAL_SERVER_ERROR);
  }
};

module.exports = getBookList;
