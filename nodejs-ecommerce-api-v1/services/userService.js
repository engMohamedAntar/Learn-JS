//userService.js
const sharp= require('sharp');
const { v4: uuidv4 } = require('uuid');         //creates a random id
const bcrypt= require('bcrypt');
const asyncHandler= require('express-async-handler');
const UserModel= require('../models/userModel');
const factory= require('./handlersFactory');
const {uploadSingleImage}= require('../middlewares/uploadimageMiddleware');
const ApiError= require('../utils/ApiError');

//upload single image
exports.uploadUserImage= uploadSingleImage('profileImage');  

//Image processing
exports.resizeImage= asyncHandler( async(req,res,next)=>{
    const fileName= `user-${uuidv4()}-${Date.now()}.jpeg`;
    if(req.file&& req.file.buffer)
    {
        await sharp(req.file.buffer)
        .resize(400,400)
        .toFormat('jpeg')
        .jpeg({quality: 90})
        .toFile(`uploads/users/${fileName}`);
        req.body.profileImage= fileName; // save image to data base (req.body is passed to the Model.create in the createOne function)
    }
    
    next();
});

// @desc    Get list of users
// @route   GET /api/v1/users
// @access  Private
exports.getUsers= factory.getAll(UserModel);

// @desc    Get list of users
// @route   GET /api/v1/users/:id
// @access  Private
exports.getUser= factory.getOne(UserModel);

// @desc    Create user
// @route   POST /api/v1/users
// @access  Private
exports.createUser= factory.createOne(UserModel);

// @desc    Update user
// @route   POST /api/v1/users/:id
// @access  Private
//updates all user fields except the password
exports.updateUser= asyncHandler(async (req,res,next)=>{
    const document= await UserModel.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            slug: req.body.slug,
            phone: req.body.phone,
            email: req.body.email,
            profileImg: req.body.profileImg,
            role: req.body.role
        },
        {new:true}  // return the updated document not the old one
    );
    if(!document){
        return next(new ApiError(`No document found for this id ${req.params.id}`,400)) ;
    }
    res.status(200).json({data: document});
});

//update the user password only
exports.changePassword= asyncHandler(async (req,res,next)=>{

    const document= await UserModel.findByIdAndUpdate(
        req.params.id,
        {
            password: await bcrypt.hash(req.body.password,12),
            passwordChangedAt: Date.now()
        },
        {new:true}  // return the updated document not the old one
    );
    if(!document){
        return next(new ApiError(`No document found for this id ${req.params.id}`,400)) ;
    }
    res.status(200).json({data: document});
});


// @desc    Delete user
// @route   DELETE /api/v1/users/:id
// @access  Private
exports.deleteUser= factory.deleteOne(UserModel);