const express = require("express");
const {
  createPostController,
  getPostController,
  getPostDetailsController,
  likePostController,
} = require("../controller/post.controller");
const identifyUser = require("../middlewares/auth.middleware");
const upload = require("../middlewares/upload.middleware");

const postRouter = express.Router();

/**
 * @route POST /api/post
 * @description Create a Post
 * @access private
 */
postRouter.post(
  "/",
  upload.single("image"),
  identifyUser,
  createPostController,
);

/**
 * @route GET /api/post
 * @description Get posts by user id
 * @access private
 */
postRouter.get("/", identifyUser, getPostController);

/**
 * @route GET /api/post/:id
 * @description Get one postdata by post id
 * @access private
 */
postRouter.get("/:id", identifyUser, getPostDetailsController);

/**
 * @route POST /api/post/like/:id
 * @description like a post by postId
 * @access private
 */
postRouter.post("/like/:id", identifyUser, likePostController);

module.exports = postRouter;
