const jwt = require("jsonwebtoken");
const postModel = require("../models/post.model");
const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");
const likeModel = require("../models/like.model");

const client = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY, // This is the default and can be omitted
});

async function postController(req, res) {
  const file = await client.files.upload({
    file: await toFile(Buffer.from(req.file.buffer), "file"),
    fileName: "image",
    folder: "/Cohort-2-insta-clone",
  });

  const post = await postModel.create({
    user: req.user.id,
    caption: req.body.caption,
    imgUrl: file.url,
  });

  res.status(201).json({
    message: "post created succesfully",
    post,
  });
}

async function getPostController(req, res) {
  const userId = req.user.id;

  const posts = await postModel.find({ user: userId });

  res.status(200).json({
    message: "Posts Fetch succesfully",
    posts,
  });
}

async function getPostDetailsController(req, res) {
  const userId = req.user.id;
  const postId = req.params.id;

  const post = await postModel.findById(postId);

  if (!post) {
    return res.status(404).json({
      message: "post not found",
    });
  }

  const isValidUser = post.user.toString() === userId;

  if (!isValidUser) {
    return res.status(404).json({
      message: "Forbidden Content",
    });
  }

  res.status(200).json({
    message: "Post fetched succesfully",
    post,
  });
}

async function likePostController(req, res) {
  const username = req.user.username;
  const postId = req.params.postId;

  const post = await postModel.findById(postId);

  if (!post) {
    return res.status(404).json({
      message: "post not found",
    });
  }

  const like = await likeModel.create({
    user: username,
    post: postId,
  })

  res.status(201).json({
    message: "Post liked successfully",
    like,
  })
}

module.exports = {
  postController,
  getPostController,
  getPostDetailsController,
  likePostController,
};
