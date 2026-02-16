const express = require("express");
const { postController, postDeleteController } = require("../controllers/post.controller");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

const postRouter = express.Router();

/**
 * POST /api/post/
 */
postRouter.post("/", upload.array("image"), postController);

postRouter.post("/delete/:id", postDeleteController);

module.exports = postRouter;
