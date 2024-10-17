//userRoutes.js
const express= require('express');
const {signUpValidator}= require('../utils/validators/authValidator');

const {signUp}= require('../services/authService');
    
const router= express.Router(); 


router.route('/signUp')               
    .post(signUpValidator ,signUp)
module.exports= router;

