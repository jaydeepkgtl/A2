const { createUser, getUser, updateUser } = require("../controllers/user");
const {
  checkIsLoggedIn,
  checkAuthenticated,
  hasAllAccessRights,
} = require("../middlewares");

const router = require("express").Router();

router.post("/", checkIsLoggedIn, createUser);

router.use(checkAuthenticated);
router.use(hasAllAccessRights(["ADMIN"]));

router.get("/:userId", getUser);
router.patch("/:userId", updateUser);

module.exports = router;
