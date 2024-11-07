//brandService.js
const asyncHandler= require('express-async-handler');
const ReviewModel= require('../models/reviewModel');
const factory= require('./handlersFactory');

// @desc Get list of reviews
// @route Get /api/v1/reviews
// @access Public
exports.getReviews= factory.getAll(ReviewModel);

// @desc Get specific review
// @route Get /api/v1/reviews/:id
// @access Public
exports.getReview= factory.getOne(ReviewModel);

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