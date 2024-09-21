const express = require("express");
const router = express.Router(); //use the Router middleWare to export it to index.js
const verifyToken= require("../middleWares/verifyToken");
const controllers = require("../controllers/courses-controllers");
const validationShema = require("../middleWares/validationSchema");
const userRoles = require("../utils/userRoles");
const allowedTo= require("../middleWares/allowedTo");

router.route("/")
    .get(verifyToken, controllers.getAllCourses)
    .post(verifyToken, allowedTo(userRoles.MANAGER), validationShema(), controllers.createCourse);

router.route("/:courseId")
    .get(verifyToken, controllers.getSingleCourse)
    .patch(verifyToken, controllers.updateCourse)
    .delete( verifyToken,allowedTo(userRoles.ADMIN,userRoles.MANAGER) , controllers.deletCourse);
    // allowedTo function will be able to see the currUser variable comming from the head of the previous middleWare (verifyToken)

module.exports = router;
