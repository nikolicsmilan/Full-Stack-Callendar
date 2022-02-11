const express = require("express");
const { check } = require("express-validator");
const usersController = require("../controllers/users-controllers");
const router = express.Router();
console.log(`users routes lefut?`)
router.get("/", usersController.getUsers);

router.post(
  "/signup",
  [
    check("name").not().isEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 8 }),
  ],
  usersController.signup
);

router.post("/login", usersController.login);

module.exports = router;
