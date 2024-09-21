const asyncWrapper = require("../middleWares/asyncWrapper");
const Course = require("../models/course_model"); // get the Course model
const httpStatusText = require("../utils/httpStatusText");
const appError= require("../utils/appError");

const getAllCourses = asyncWrapper( async (req, res) => {

  const query = req.query;

  const limit = query.limit || 10;
  const page = query.page || 1;
  const skip = (page - 1) * limit;

  const courses = await Course.find({}, { __v: false }).limit(limit).skip(skip);

  res.json({
    status: httpStatusText.SUCCESS,
    data: { courses: courses }, //or   data:{courses}
  });
  res.end();
})

//asyncWrapper will handle the invalid object_id
const getSingleCourse = asyncWrapper(
  async (req, res,next) => {
    const course = await Course.findById(req.params.courseId);
    if (!course)
    {
      const error= appError.create("course not found ",404,httpStatusText.FAIL);
      return next(error);
    }
    return res.json({ status: httpStatusText.SUCCESS, data: { course: course } });
})


const { validationResult } = require("express-validator");

const createCourse = asyncWrapper( async (req, res,next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error= appError.create(errors.array(),400,httpStatusText.FAIL);
    return next(error);
  }

  //create a new course using the Course model
  const newCourse = new Course(req.body);
  await newCourse.save(); //save newCourse into database

  res.status(201).json({ status: "success", data: { course: newCourse } });
})

const updateCourse = asyncWrapper( async (req, res) => {
  const courseId = req.params.courseId;

    // updateOne returns the update info
    const updatedCourse = await Course.updateOne( {_id: courseId}, { $set: {...req.body} } );
    return res.status(200).json({status: httpStatusText.SUCCESS, data: { course: updatedCourse }});
})

const deletCourse = asyncWrapper( async (req, res) => {
    await Course.deleteOne({ _id: req.params.courseId });
    
    res.status(200).json({ status: httpStatusText.SUCCESS, data: null });
})

module.exports = {
  getAllCourses,
  getSingleCourse,
  createCourse,
  updateCourse,
  deletCourse,
};
