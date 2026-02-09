const Course = require("../models/Course");

// Create course
exports.createCourse = async (req, res) => {
  try {
    const course = await Course.create(req.body);
    return res.status(201).json({ course });
  } catch (err) {
    return res.status(400).json({ message: "Create course failed", error: err.message });
  }
};

// List all courses
exports.listCourses = async (req, res) => {
  try {
    const courses = await Course.find().sort({ createdAt: -1 });
    return res.json({ courses });
  } catch (err) {
    return res.status(500).json({ message: "List courses failed", error: err.message });
  }
};

// Update course
exports.updateCourse = async (req, res) => {
  try {
    const updated = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Course not found" });
    return res.json({ course: updated });
  } catch (err) {
    return res.status(400).json({ message: "Update course failed", error: err.message });
  }
};

// Delete course (optional)
exports.deleteCourse = async (req, res) => {
  try {
    const deleted = await Course.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Course not found" });
    return res.json({ message: "Course deleted" });
  } catch (err) {
    return res.status(400).json({ message: "Delete course failed", error: err.message });
  }
};

// Admin: list students in a course
exports.listStudentsInCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate("students", "-password");
    if (!course) return res.status(404).json({ message: "Course not found" });
    return res.json({ course, students: course.students });
  } catch (err) {
    return res.status(500).json({ message: "List students in course failed", error: err.message });
  }
};
