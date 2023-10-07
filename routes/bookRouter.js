const router = require("express").Router();
const multer = require("../utils/multer");
const {
  getBookList,
  postBook,
  getBook,
  updateBook,
  deleteBook,
  uploadImg,
  getBookListAgg,
} = require("../controllers/books");
const { checkAuthenticated, hasAllAccessRights } = require("../middlewares");

router.use(checkAuthenticated);

router.get("/", hasAllAccessRights(["READ"]), getBookList);
router.get("/agg", hasAllAccessRights(["READ"]), getBookListAgg);
router.post("/", hasAllAccessRights(["WRITE"]), postBook);
router.get("/:id", hasAllAccessRights(["READ"]), getBook);
router.patch("/:id", hasAllAccessRights(["WRITE"]), updateBook);
router.delete("/:id", hasAllAccessRights(["WRITE"]), deleteBook);

router.post("/upload/:bookId", multer.single("image"), uploadImg);

module.exports = router;
