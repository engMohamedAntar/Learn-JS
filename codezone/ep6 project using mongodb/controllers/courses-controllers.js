const Course = require("../models/course_model"); // get the Course model

const getAllCourses = async (req, res) => {
  const courses = await Course.find(); //get all courses from DB using Course model

  res.json(courses);
  res.end();
};

const getSingleCourse = async (req, res) => {
  // we are using try and catch to handle the case in which
  // ObjectId is not valid
  try {
    const course = await Course.findById(req.params.courseId);
    if (!course) return res.status(404).json({ msg: "course not found" });

    res.json(course);
    res.end();
  } catch {
    return res.status(400).json({ msg: "invalid course id" });
  }
};

const { validationResult } = require("express-validator");

const createCourse = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json(errors.array());

  //create a new course using the Course model
  const newCourse = new Course(req.body);
  await newCourse.save(); //save newCourse into database

  res.status(201).json(newCourse);
};

const updateCourse = async (req, res) => {
  const courseId = req.params.courseId;
  try {
    const updatedCourse = await Course.updateOne( // updateOne returns the update info
      { _id: courseId },
      { $set: { ...req.body } }
    );
    return res.status(200).json(updatedCourse);
  } catch (e) {
    return res.status(400).json({ error: e });
  }
};

const deletCourse = async (req, res) => {
  try {
    const val = await Course.deleteOne({ _id: req.params.courseId });
    res.status(200).json({ success: true, msg: val });
  } catch (e) {
    res.status(400).json({ error: e });
  }
};

module.exports = {
  getAllCourses,
  getSingleCourse,
  createCourse,
  updateCourse,
  deletCourse,
};
