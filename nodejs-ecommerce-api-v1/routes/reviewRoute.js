const express= require('express');
const {protect, allowedTo}= require('../services/authService');
const {getReviews, getReview, createReview, updateReview, deleteReview}= require('../services/reviewService');
const {createReviewValidator, getReviewValidator, updateReviewValidator, deleteReviewValidator} = require('../utils/validators/reviewValidator');
const router= express.Router();

router.route('/')
    .get(getReviews)
    .post(
        protect,
        allowedTo('user'),
        createReviewValidator,
        createReview
    )
router.route('/:id')
    .get(getReviewValidator,getReview)
    .put(
        protect,
        allowedTo('user'),
        updateReviewValidator,
        updateReview
    )
    .delete(
        protect,
        allowedTo('user','admin','manager'),
        deleteReviewValidator,
        deleteReview
    );

module.exports= router;