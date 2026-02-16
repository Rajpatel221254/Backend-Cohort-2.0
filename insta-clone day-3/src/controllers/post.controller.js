const imageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");
const jwt = require("jsonwebtoken");
const postModel = require("../models/post.model");

const client = new imageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

async function postController(req, res) {
  if (!req.files || req.files.length > 2) {
    return res.status(409).json({
      message: "File upload limit exceeded",
    });
  }

  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized access",
    });
  }

  let decoded = null;

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    res.status(404).json({
      message: "Token not found unauthorized access",
    });
  }

  const uploadPromises = req.files.map(async (elem) => {
    return client.files.upload({
      file: await toFile(Buffer.from(elem.buffer), "file"),
      fileName: "image",
      folder: "/Cohort-2-insta-clone",
    });
  });

  const fileList = await Promise.all(uploadPromises);

  const post = await postModel.create({
    caption: req.body.caption,
    imgUrl: fileList.map((elem) => {
      return elem.url;
    }),
    id: decoded.id,
  });

  res.status(201).json({
    message: "Post created Sucessfully",
    post,
  });
}

async function postDeleteController(req, res) {
  const id = req.params.id;

  await postModel.findByIdAndDelete(id);

  res.status(200).json({
    message: "Post deleted succesfully",
  });
}

module.exports = { postController, postDeleteController };
