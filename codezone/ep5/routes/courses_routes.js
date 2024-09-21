const express = require("express");
const router = express.Router(); //use the Router middleWare to export it to index.js

const controllers = require("../controllers/courses-controllers");
const validationShema = require("../middleWares/validationSchema");

router.get("/", controllers.getAllCourses); // '/' is the path comming after "/api/courses"

router.get("/:courseId", controllers.getSingleCourse);

// using a middleware(express-validator) to handle the post body
router.post("/", validationShema(), controllers.createCourse);

router.patch("/:courseId", controllers.updateCourse);

router.delete("/:courseId", controllers.deletCourse);

module.exports = router;
