const express = require("express");
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const crypto = require('crypto')

const authRouter = express.Router();

authRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const isUserAlreadyExist = await userModel.findOne({ email });

  if (isUserAlreadyExist) {
    res.status(400).json({
      message: "User already exist with this email",
    });
  }

  const hash = crypto.createHash('md5').update(password).digest('hex')

  const user = await userModel.create({
    name,
    password: hash,
    email,
  });

  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    process.env.JWT_SECRET,
  );

  res.cookie("jwt_token", token)

  res.status(201).json({
    message: "User register succesfully",
    user,
    token
  });
});

authRouter.post('/protected', (req,res)=>{
  console.log(req.cookies);

  res.status(200).json({
    message:"Cookies fetched",
  })
})


authRouter.post('/login', async (req,res)=>{
  const {email, password} = req.body

  const user = await userModel.findOne({email})

  if(!user){
    res.status(404).json({
      message:"invalid Email"
    })
  }

  const passwordMatched = user.password == crypto.createHash('md5').update(password).digest('hex')

  if(!passwordMatched){
    res.status(404).json({
      message:"Invalid password"
    })
  }

  const token = jwt.sign({
    id:user._id
  }, process.env.JWT_SECRET)

  res.cookie('jwt_token', token)

  res.status(200).json({
    message:"Login successfully",
    user
  })
})

module.exports = authRouter;
