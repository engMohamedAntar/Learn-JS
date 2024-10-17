const asyncHandler= require('express-async-handler');
const jwt= require('jsonwebtoken');
const UserModel= require('../models/userModel');


exports.signUp= asyncHandler(async(req,res,next)=>{
//create user
const user= await UserModel.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
})

//create a jwt for this user
const token= jwt.sign({userId: user._id}, process.env.secretKey,{expiresIn:'1d'});

//return the response to client side
res.status(201).json({data: user, token});
});