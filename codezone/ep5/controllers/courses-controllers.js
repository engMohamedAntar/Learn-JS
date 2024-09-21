let { courses } = require("../data/courses");

const getAllCourses = async (req, res) => {
  res.json(courses);
  res.end();
};

const getSingleCourse = (req, res) => {
  const course_id = +req.params.courseId;
  const course = courses.find((course) => course.id === course_id);
  if (!course) return res.status(404).json({ msg: "course not found" });

  res.json(course);
  res.end();
};

const { validationResult } = require("express-validator");

const createCourse = (req, res) => {
  const errors = validationResult(req); //returns any error
  if (!errors.isEmpty()) return res.status(400).json(errors.array());
  const course = { id: courses.length + 1, ...req.body };
  courses.push(course);
  res.status(201).json(course);
};

const updateCourse = (req, res) => {
  const courseId = +req.params.courseId;
  let course = courses.find((course) => course.id === courseId);
  if (!course) return res.status(404).json({ msg: "course not found" });
  course = { ...course, ...req.body }; // the property in req.body will override on the old property in course
  res.json(course);
};

const deletCourse = (req, res) => {
  const courseId = +req.params.courseId;
  //return all the courses that != courseId
  courses = courses.filter((course) => course.id !== courseId);
  res.status(200).json({ sucess: "true" });
};

module.exports = {
  getAllCourses,
  getSingleCourse,
  createCourse,
  updateCourse,
  deletCourse,
};
