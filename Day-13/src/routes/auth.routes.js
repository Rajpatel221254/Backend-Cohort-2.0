const express = require('express')
const userModel = require('../models/user.model')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
 
const authRouter = express.Router()

/**
 * /api/auth/register
 */
authRouter.post('/register',async (req,res)=>{
    const {name, email, password} = req.body

    const isUserAlreadyExist = await userModel.findOne({email})

    if(isUserAlreadyExist){
        res.status(409).json({
            message:"User exist with this email"
        })
    }

    const hash = crypto.createHash('md5').update(password).digest('hex')

    const user = await userModel.create({
        name,email,password: hash
    })

    const token = jwt.sign(
        {
            id:user._id,
            email:user.email
        },
        process.env.JWT_SECRET
    )

    res.cookie('jwt_token', token)

    res.status(200).json({
        message:"User registered succesfully",
        user,
        token
    })
})

/**
 * /api/auth/protected
 */
authRouter.post('/protected', (req,res)=>{
    console.log(req.cookies);

    res.status(200).json({
        message:"Cookies fetched successfully"
    })    
})

/**
 * /api/auth/login
 */
authRouter.post('/login', async (req,res)=>{
    const { email, password } = req.body

    const user = await userModel.findOne({email})

    if(!user){
        res.status(404).json({
            message:"User with this email not found.."
        })
    }

    const passwordMatched = user.password == crypto.createHash('md5').update(password).digest('hex')

    if(!passwordMatched){
        res.status(404).json({
            message:"Invalid password"
        })
    }

    const token = jwt.sign(
        {
            id:user._id
        },
        process.env.JWT_SECRET
    )

    res.cookie("jwt_token", token)

    res.status(200).json({
        message:"User login succesfully",
        user
    })
})

module.exports = authRouter