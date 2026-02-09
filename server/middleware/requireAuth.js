const jwt = require("jsonwebtoken");
const Student = require("../models/Student");
const { JWT_SECRET } = require("../config/config");

module.exports = async function requireAuth(req, res, next) {
  try {
    const token = req.cookies?.token;
    if (!token) return res.status(401).json({ message: "Not authenticated" });

    const payload = jwt.verify(token, JWT_SECRET);

    const student = await Student.findById(payload.id).select("-password");
    if (!student) return res.status(401).json({ message: "User not found" });

    req.user = {
      id: student._id,
      studentNumber: student.studentNumber,
      isAdmin: student.isAdmin,
      firstName: student.firstName,
      lastName: student.lastName,
    };

    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
