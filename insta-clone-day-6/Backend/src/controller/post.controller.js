const postModel = require("../models/post.model");
const likeModel = require("../models/like.model");
const jwt = require("jsonwebtoken");
const imagekit = require("../config/imagekit.config");
const { toFile } = require("@imagekit/nodejs");
const user = require('../models/user.model')

async function createPostController(req, res) {
  const file = await imagekit.files.upload({
    file: await toFile(Buffer.from(req.file.buffer), "file"),
    fileName: "postImage",
    folder: "insta-clone-post-images",
  });

  const post = await postModel.create({
    caption: req.body.caption,
    image: file.url,
    user: req.user.id,
  });

   const populatedPost = await post.populate(
      "user",
      "username profilePic"
    );

    res.status(201).json(populatedPost);
}

async function getAllPostController(req, res) {
  const posts = await postModel.find().populate("user");

  res.status(200).json({
    message: "Posts fetch succesfully",
    posts,
  });
}

async function getPostController(req, res) {
  const userId = req.user.id;

  const posts = await postModel.find({ user: userId });

  res.status(200).json({
    message: "Posts fetch succefully",
    posts,
  });
}

async function getPostDetailsController(req, res) {
  const postId = req.params.id;
  const userId = req.user.id;

  const post = await postModel.findById(postId);

  if (!post) {
    return res.status(404).json({
      message: "Post not found",
    });
  }

  const isValidUser = post.user.toString() === userId;

  if (!isValidUser) {
    return res.status(404).json({
      message: "Unauthorized access",
    });
  }

  res.status(200).json({
    message: "Post fetch succesfully",
    post,
  });
}

async function likePostController(req, res) {
  const username = req.user.username;
  const postId = req.params.id;

  const post = await postModel.findById(postId);

  if (!post) {
    return res.status(404).json({
      message: "Post not found",
    });
  }

  const likeRecord = await likeModel.create({
    user: username,
    post: postId,
  });

  res.status(201).json({
    message: `Post liked succesfully`,
    likeRecord,
  });
}

module.exports = {
  likePostController,
  createPostController,
  getPostController,
  getPostDetailsController,
  getAllPostController
};
