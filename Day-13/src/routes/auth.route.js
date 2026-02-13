const express = require("express");
const userModel = require("../models/user.model");

const authRouter = express.Router();
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

/**
 * POST /api/auth/register
 */
authRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const isUserExist = await userModel.findOne({ email });

  if (isUserExist) {
    res.status(400).json({
      message: "User already exist with this email...",
    });
  }

  const user = await userModel.create({
    name,
    email,
    password: crypto.createHash("md5").update(password).digest("hex"),
  });

  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" },
  );

  res.cookie("token", token);

  res.status(200).json({
    message: "User registered succesfully",
    user,
    token,
  });
});

/**
 * GET /api/auth/get-me
 */

authRouter.get("/get-me", async (req, res) => {
  const token = req.cookies.token;

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const user = await userModel.findById(decoded.id);

  if (!user) {
    res.status(409).json({
      message: "User not found",
    });
  }

  res.status(200).json({
    message: "User found",
    user,
  });
});

/**
 * POST /api/auth/login
 */
authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });

  if (!user) {
    res.status(409).json({
      message: "Email invalid",
    });
  }

  const hash = crypto.createHash("md5").update(password).digest("hex");

  const validpassword = user.password == hash;

  if (!validpassword) {
    res.status(409).json({
      message: "password invalid",
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    process.env.JWT_SECRET,
  );

  res.cookie("token", token);

  res.status(200).json({
    message: "login succesfully",
    user,
    token,
  });
});

module.exports = authRouter;
