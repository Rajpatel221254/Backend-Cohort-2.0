const express = require("express");
const { userFollowController, userUnfollowController } = require("../controllers/user.controller");
const identifyUser = require('../middlewares/auth.middleware')

const userRouter = express.Router();

/**
 * @route POST /api/user/follow/:userId
 * @desc Follow a user
 * @access Private
 */
userRouter.post("/follow/:username", identifyUser, userFollowController);

/**
 * @route POST /api/user/unfollow/:userId
 * @desc Unfollow a user
 * @access Private
 */
userRouter.post('/unfollow/:username', identifyUser, userUnfollowController);

module.exports = userRouter;
