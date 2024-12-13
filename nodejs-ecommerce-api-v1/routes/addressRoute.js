//addressesRoute.js
const express = require('express');
const router = express.Router();
const { protect, allowedTo } = require('../services/authService');
const { addAddress, removeAddress,getLoggedUserAddresses } = require('../services/addressService');

router.use(protect, allowedTo('user'));
router.route('/')
    .post( addAddress)
    .get( getLoggedUserAddresses)
router.route('/:addressId')
    .delete(removeAddress);

module.exports = router;
