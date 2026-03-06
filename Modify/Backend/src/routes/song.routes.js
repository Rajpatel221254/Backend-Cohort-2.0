const express = require("express");
const {
  postSongController,
  getSongController,
} = require("../controllers/song.controller");
const { upload } = require("../middlewares/upload.middleware");
const { authMiddleware } = require("../middlewares/auth.middleware");

/**
 * require a router to create routes
 */
const songRouter = express.Router();

/**
 * @route POST /api/songs
 * @description Post a song in database and imgekit
 * @access Private
 */
songRouter.post("/", upload.single("song"), postSongController);

/**
 * @route GET /api/songs
 * @description Get a song based on mood (mood passed in url)
 * @access Private
 */
songRouter.get("/", authMiddleware ,getSongController);

module.exports = songRouter;
