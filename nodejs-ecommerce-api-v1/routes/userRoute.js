//userRoutes.js
const express= require('express');
const {
    getUserValidator,
    createUserValidator,
    updateUserValidator,
    deleteUserValidator,
    changePasswordValidator
    }= require('../utils/validators/userValidator');

const {
      getUsers,
      createUser,
      getUser,
      updateUser,
      deleteUser,
      changePassword,
      uploadUserImage,
      resizeImage
    } = require('../services/userService');

const {protect, allowedTo}= require('../services/authService');

const router= express.Router(); 


router.route('/')               
    .get(getUsers)
    .post(
        protect,
        allowedTo('admin','manager'),
        uploadUserImage, 
        resizeImage, 
        createUserValidator, 
        createUser)
router.route('/:id')
    .get(getUserValidator, getUser)
    .put(
        protect,
        allowedTo('admin','manager'),
        uploadUserImage,
        resizeImage,
        updateUserValidator, 
        updateUser)
    .delete(
        protect,
        allowedTo('admin'),
        deleteUserValidator
        ,deleteUser)
router.route('/changePassword/:id')
    .put(changePasswordValidator, changePassword)
module.exports= router;





