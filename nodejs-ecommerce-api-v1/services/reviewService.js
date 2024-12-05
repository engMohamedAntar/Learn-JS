//brandService.js
const asyncHandler= require('express-async-handler');
const ReviewModel= require('../models/reviewModel');
const factory= require('./handlersFactory');


//check this part
exports.createFilterObject= (req,res,next)=>{
    let filterObj= {};
    if(req.params.productId){
        filterObj= {product: req.params.productId};
    }
    req.filterObj= filterObj;
    next();
}

// @desc Get list of reviews
// @route Get /api/v1/reviews
// @access Public
exports.getReviews= factory.getAll(ReviewModel);

// @desc Get specific review
// @route Get /api/v1/reviews/:id
// @access Public
exports.getReview= factory.getOne(ReviewModel);

exports.setProductIdAndUserIdToBody= (req,res,next)=>{
    if(!req.body.product)  req.body.product= req.params.productId;
    if(!req.body.user)  req.body.user= req.user._id;
    next();
}

// @desc Get list of reviews
// @route Post /api/v1/reviews
// @access Private/Protect/User
exports.createReview= factory.createOne(ReviewModel);

// @desc Get list of reviews
// @route Get /api/v1/reviews
// @access Private/Protect/User
exports.updateReview= factory.updateOne(ReviewModel);

// @desc Get list of reviews
// @route Get /api/v1/reviews
// @access Private/Protect/User-Admin-Manager
exports.deleteReview= factory.deleteOne(ReviewModel);