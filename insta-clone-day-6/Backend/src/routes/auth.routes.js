const express = require("express");
const {
  userRegisterController,
  userLoginController,
  getMeController
} = require("../controller/auth.controller");
const identifyUser = require('../middlewares/auth.middleware')

const authRouter = express.Router();

/**
 * @route POST /api/auth/register
 * @description Register a user
 * @access private
 */
authRouter.post(
  "/register",
  userRegisterController,
);

/**
 * @route POST /api/auth/login
 * @description Login a user
 * @access private
 */
authRouter.post("/login", userLoginController);

/**
 * @route GET /api/auth/me
 * @description Get current user details if exist through token
 * @access private
 */
authRouter.get("/me", identifyUser, getMeController)

module.exports = authRouter;
