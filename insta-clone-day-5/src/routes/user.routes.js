const express = require("express");
const identifyUser = require("../middlewares/auth.middleware");
const {
  sendFollowRequestController,
  unfollowUserController,
  acceptFollowRequestController,
  rejectFollowRequestController,
  getUserAllRequestController,
} = require("../controller/user.controller");

const userRouter = express.Router();

/**
 * @route POST /api/user/request/:username
 * @description Follow user using user's username
 * @access private
 */
userRouter.post(
  "/request/:username",
  identifyUser,
  sendFollowRequestController,
);

/**
 * @route POST /api/user/accepted/:id
 * @description Accept a user request
 * @access private
 */
userRouter.patch("/accepted/:id", identifyUser, acceptFollowRequestController);

/**
 * @route POST /api/user/rejected/:id
 * @description Reject a user Request
 * @access private
 */
userRouter.patch("/rejected/:id", identifyUser, rejectFollowRequestController);

/**
 * @route GET /api/user/requests
 * @description Get user's all request
 * @access private
 */
userRouter.get("/requests", identifyUser, getUserAllRequestController);

/**
 * @route POST /api/user/unfollow/:username
 * @description Unfollow user using user's username
 * @access private
 */
userRouter.post("/unfollow/:username", identifyUser, unfollowUserController);

module.exports = userRouter;
