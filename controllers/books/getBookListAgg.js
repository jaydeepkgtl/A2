const { ReasonPhrases, StatusCodes } = require("http-status-codes");
const { Types } = require("mongoose");
const {
  BookModel: { Book },
} = require("../../models");

const getBookListAgg = async (req, resp) => {
  const { page, limit, name, sortBy = "updatedAt", sortType = -1 } = req.query;
  const startIndex = (page - 1) * limit;
  // const categoryId =
  //   category != null && category !== ""
  //     ? new Types.ObjectId(category)
  //     : undefined;

  try {
    const bookList = await Book.aggregate([
      // Getting all the data
      {
        $match: {
          $text: {
            $search: name,
            $caseSensitive: false,
          },
        },
      },
      {
        $sort: {
          [sortBy]: Number(sortType),
        },
      },
      {
        $skip: startIndex,
      },
      {
        $limit: limit != null && limit !== "" ? Number(limit) : 3,
      },
    ]).exec();

    // const bookList = await Book.find({ /* query */ }).sort().skip().limit()
    const totalBooks = await Book.countDocuments().exec();
    resp.status(StatusCodes.OK).json({
      data: bookList,
      pagination: {
        page,
        limit,
        total: totalBooks,
      },
    });
  } catch (err) {
    resp
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(err.message ?? ReasonPhrases.INTERNAL_SERVER_ERROR);
  }
};

module.exports = getBookListAgg;
