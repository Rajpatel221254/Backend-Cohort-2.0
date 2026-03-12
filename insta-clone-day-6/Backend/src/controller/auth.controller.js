const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const imagekit = require("../config/imagekit.config");
const { toFile } = require("@imagekit/nodejs");

async function userRegisterController(req, res) {
  const { username, email, password, bio, profilePic, fullname } = req.body;

  const isUserAlreadyExist = await userModel.findOne({
    $or: [
      {
        username: username,
      },
      {
        email: email,
      },
    ],
  });

  if (isUserAlreadyExist) {
    return res.status(409).json({
      message:
        "User already exist with this " +
        (isUserAlreadyExist.email === email ? "Email" : "Username"),
    });
  }

  const hash = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    username: username,
    email: email,
    password: hash,
    bio,
    profilePic,
    fullname,
  });

  const token = jwt.sign(
    {
      id: user._id,
      username: user.username,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );

  res.cookie("token", token);

  res.status(201).json({
    message: "User registered Succesfully",
    user: {
      username: user.username,
      email: user.email,
      bio: user.bio,
      profilePic: user.profilePic,
      fullname: user.fullname,
    },
  });
}

async function userLoginController(req, res) {
  const { identifier, password } = req.body;

  if (!identifier || !password) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  const user = await userModel.findOne({
    $or: [{ email: identifier }, { username: identifier }],
  });

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(404).json({
      message: "Password is invalid",
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
      username: user.username,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );

  res.cookie("token", token);

  res.status(200).json({
    message: `${user.username} login succesfully`,
    user: {
      username: user.username,
      email: user.email,
      bio: user.bio,
      fullname: user.fullname,
      profilePic: user.profilePic,
    },
  });
}

async function getMeController(req, res) {
  const userId = req.user.id;

  const user = await userModel.findById(userId);

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  res.status(200).json({
    message: "User Found",
    user
  });
}

module.exports = {
  userRegisterController,
  userLoginController,
  getMeController,
};
