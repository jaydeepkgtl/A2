const multer = require("multer");
const path = require("path");
const { ErrorCodes } = require("../constants");

const storage = multer.diskStorage({
  destination: path.join(__dirname, "../public"),
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}${path.extname(file.originalname)}`);
  },
});

const multerInstance = multer({
  storage,
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    const mimeType = file.mimetype;
    if (mimeType.split("/")[0] !== "image") {
      return cb(new Error(ErrorCodes.INVALID_FILE_TYPE), false);
    }
    cb(null, true);
  },
});

module.exports = multerInstance;
