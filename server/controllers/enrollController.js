const Course = require("../models/Course");

// Student adds a course (adds their ObjectId into course.students)
exports.addCourse = async (req, res) => {
  try {
    const studentId = req.user.id;
    const { courseId } = req.body;

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    const already = course.students.some((id) => String(id) === String(studentId));
    if (already) return res.status(400).json({ message: "Already enrolled in this course" });

    course.students.push(studentId);
    await course.save();

    return res.json({ message: "Enrolled", course });
  } catch (err) {
    return res.status(400).json({ message: "Enroll failed", error: err.message });
  }
};

// Student updates course section: simplest approach = update course.section
// (In real systems, section would be per-student, but this is acceptable for lab simplicity.)
exports.updateCourseSection = async (req, res) => {
  try {
    const { courseId, newSection } = req.body;

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    course.section = newSection;
    await course.save();

    return res.json({ message: "Section updated", course });
  } catch (err) {
    return res.status(400).json({ message: "Update section failed", error: err.message });
  }
};

// Student drops course
exports.dropCourse = async (req, res) => {
  try {
    const studentId = req.user.id;
    const { courseId } = req.body;

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    course.students = course.students.filter((id) => String(id) !== String(studentId));
    await course.save();

    return res.json({ message: "Dropped", course });
  } catch (err) {
    return res.status(400).json({ message: "Drop failed", error: err.message });
  }
};

// Student list their courses
exports.myCourses = async (req, res) => {
  try {
    const studentId = req.user.id;

    const courses = await Course.find({ students: studentId }).sort({ createdAt: -1 });
    return res.json({ courses });
  } catch (err) {
    return res.status(500).json({ message: "Fetch my courses failed", error: err.message });
  }
};
