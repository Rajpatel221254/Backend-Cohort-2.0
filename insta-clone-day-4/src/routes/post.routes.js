const express = require("express");
const {
  postController,
  getPostController,
  getPostDetailsController,
  likePostController,
} = require("../controllers/post.controller");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const identifyUser = require("../middlewares/auth.middleware");

const postRouter = express.Router();

/**
 * POST /api/post/
 */
postRouter.post("/", upload.single("image"), identifyUser, postController);

/**
 * GET /api/post/
 */
postRouter.get("/", identifyUser, getPostController);

/**
 * GET /api/post/:id
 */
postRouter.get("/:id", identifyUser, getPostDetailsController);

/**
 * @route POST /api/post/like/:id
 * @desc Like a post
 * @access Private
 */
postRouter.post("/like/:postId", identifyUser, likePostController);

module.exports = postRouter;
