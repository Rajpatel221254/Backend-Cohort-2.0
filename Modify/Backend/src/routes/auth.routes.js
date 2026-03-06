const express = require("express");
const {
  registerController,
  loginController,
  getMeController,
  logoutController,
} = require("../controllers/auth.controller");
const { authMiddleware } = require("../middlewares/auth.middleware");

const authRouter = express.Router();

/**
 * @route POST /api/auth/register
 * @description Register a user
 * @access public
 */
authRouter.post("/register", registerController);

/**
 * @route POST /api/auth/login
 * @description Login a user
 * @access public
 */
authRouter.post("/login", loginController);

/**
 * @route GET /api/auth/get-me
 * @description Get the logged in user details
 * @access private
 */
authRouter.get("/get-me", authMiddleware, getMeController);

/**
 * @route Get /api/auth/logout
 * @description Logout a user
 * @access private
 */
authRouter.get("/logout", logoutController);

module.exports = authRouter;
