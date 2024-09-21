const Course = require("../models/course_model"); // get the Course model
const httpStatusText = require("../utils/httpStatusText");

const getAllCourses = async (req, res) => {
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
};

const getSingleCourse = async (req, res) => {
  // we are using try and catch to handle the case in which
  // ObjectId is not valid
  try {
    const course = await Course.findById(req.params.courseId);
    if (!course)
      return res.status(404).json({
        status: httpStatusText.FAIL,
        data: { course: "course not found" },
      });

    res.json({
      status: httpStatusText.SUCCESS,
      data: { course: course }, //or   data: {course}
    });
    res.end();
  } catch (err) {
    return res.status(400).json({
      status: httpStatusText.ERROR,
      data: null,
      message: err.message,
      code: 400,
    });
  }
};

const { validationResult } = require("express-validator");

const createCourse = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: httpStatusText.FAIL,
      data: { course: errors.array() },
    });
  }

  //create a new course using the Course model
  const newCourse = new Course(req.body);
  await newCourse.save(); //save newCourse into database

  res.status(201).json({ status: "success", data: { course: newCourse } });
};

const updateCourse = async (req, res) => {
  const courseId = req.params.courseId;
  try {
    const updatedCourse = await Course.updateOne(
      // updateOne returns the update info
      { _id: courseId },
      { $set: { ...req.body } }
    );
    return res.status(200).json({
      status: httpStatusText.SUCCESS,
      data: { course: updatedCourse },
    });
  } catch (e) {
    return res.status(400).json({
      status: httpStatusText.ERROR,
      message: { message: e.message },
    });
  }
};

const deletCourse = async (req, res) => {
  try {
    await Course.deleteOne({ _id: req.params.courseId });
    res.status(200).json({ status: httpStatusText.SUCCESS, data: null });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

module.exports = {
  getAllCourses,
  getSingleCourse,
  createCourse,
  updateCourse,
  deletCourse,
};
