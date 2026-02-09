const Student = require("../models/Student");

// Admin: create student
exports.createStudent = async (req, res) => {
  try {
    const student = await Student.create(req.body);
    return res.status(201).json({ student });
  } catch (err) {
    return res.status(400).json({ message: "Create student failed", error: err.message });
  }
};

// Admin: list students
exports.listStudents = async (req, res) => {
  try {
    const students = await Student.find().select("-password").sort({ createdAt: -1 });
    return res.json({ students });
  } catch (err) {
    return res.status(500).json({ message: "List students failed", error: err.message });
  }
};
