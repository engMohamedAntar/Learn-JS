//cartRoute.js
const express= require('express');
const router= express.Router();
const {addProductToCart}= require('../services/cartService');
const {protect, allowedTo}= require('../services/authService');
const {addProductToCartValidator}= require('../utils/validators/cartValidator');
router.route('/')
    .post(protect, allowedTo('user'),addProductToCartValidator, addProductToCart);

module.exports= router;