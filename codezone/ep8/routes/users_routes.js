const express= require("express");
const router = express.Router();
const verifyToken= require("../middleWares/verifyToken");

const usersController= require("../controllers/users-controllers");

router.route("/")
    .get(verifyToken,usersController.getAllUsers)
router.route("/register")
    .post(usersController.register)
router.route("/login")
    .post(usersController.login);

module.exports= router;


// /login