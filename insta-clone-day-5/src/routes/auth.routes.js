const express = require("express");
const {
  userRegisterController,
  userLoginController,
} = require("../controller/auth.controller");
const upload = require('../middlewares/upload.middleware')

const authRouter = express.Router();

/**
 * @route POST /api/auth/register
 * @description Register a user
 * @access private
 */
authRouter.post(
  "/register",
  upload.single("profilePic"),
  userRegisterController,
);

/**
 * @route POST /api/auth/login
 * @description Login a user
 * @access private
 */
authRouter.post("/login", userLoginController);

module.exports = authRouter;
