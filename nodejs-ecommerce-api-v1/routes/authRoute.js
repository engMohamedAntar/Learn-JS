//userRoutes.js
const express= require('express');
const {signUpValidator, logInValidator}= require('../utils/validators/authValidator');

const {signUp, logIn, forgotPassword}= require('../services/authService');
    
const router= express.Router(); 


router.route('/signUp')               
    .post(signUpValidator ,signUp)
router.route('/logIn')               
    .post(logInValidator ,logIn)
router.route('/forgotPassword')
    .post(forgotPassword)
module.exports= router;

