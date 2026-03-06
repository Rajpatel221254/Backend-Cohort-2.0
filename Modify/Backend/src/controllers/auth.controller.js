const userModel = require("../models/user.model");
const bcrpyt = require("bcrypt");
const jwt = require("jsonwebtoken");
const blacklistModel = require("../models/blacklist.model");
const redis = require("../config/cache");

async function registerController(req, res) {
  const { username, email, password } = req.body;

  const isUserExist = await userModel.findOne({
    $or: [
      {
        email: email,
      },
      {
        username: username,
      },
    ],
  });

  if (isUserExist) {
    return res.status(400).json({
      message: `User already exist with this ${isUserExist.email === email ? "Email" : "Username"}`,
    });
  }

  const hash = await bcrpyt.hash(password, 10);

  const user = await userModel.create({
    username,
    email,
    password: hash,
  });

  const token = jwt.sign(
    {
      id: user._id,
      username: user.username,
    },
    process.env.JWT_SECRET,
    { expiresIn: "3d" },
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: true, 
    sameSite: "None",
  });

  res.status(201).json({
    message: "User registered succesfully",
    user: {
      username: user.username,
      email: user.email,
    },
  });
}

async function loginController(req, res) {
  const { email, password, username } = req.body;

  const user = await userModel
    .findOne({
      $or: [
        {
          email: email,
        },
        {
          username: username,
        },
      ],
    })
    .select("+password");

  if (!user) {
    return res.status(400).json({
      message: "Invalid credentials",
    });
  }

  const isPasswordValid = await bcrpyt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(400).json({
      message: "Invalid credentials",
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
      username: user.username,
    },
    process.env.JWT_SECRET,
    { expiresIn: "3d" },
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "None",
  });

  res.status(200).json({
    message: "User logged in successfully",
    user: {
      username: user.username,
      email: user.email,
    },
  });
}

async function getMeController(req, res) {
  const user = await userModel.findById(req.user.id);

  res.status(200).json({
    message: "User details fetched successfully",
    user,
  });
}

async function logoutController(req, res) {
  const token = req.cookies.token;

  res.clearCookie("token");

  await redis.set(token, Date.now().toString());

  res.status(200).json({
    message: "User logged out successfully",
  });
}

module.exports = {
  registerController,
  loginController,
  getMeController,
  logoutController,
};
