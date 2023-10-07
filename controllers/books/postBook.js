const { ReasonPhrases, StatusCodes } = require("http-status-codes");
const {
  BookModel: { Book },
} = require("../../models");

const postBook = async (req, resp) => {
  try {
    const newBook = new Book(req.body);
    await newBook.save();
    resp.status(StatusCodes.CREATED).json(newBook);
  } catch (err) {
    resp
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(err.message ?? ReasonPhrases.INTERNAL_SERVER_ERROR);
  }
};
module.exports = postBook;
