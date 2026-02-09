const jwt = require("jsonwebtoken");
const Student = require("../models/Student");
const { JWT_SECRET, NODE_ENV } = require("../config/config");

function signToken(student) {
  return jwt.sign(
    { id: student._id, isAdmin: student.isAdmin },
    JWT_SECRET,
    { expiresIn: "7d" }
  );
}

// POST /auth/login
exports.login = async (req, res) => {
  try {
    const { studentNumber, password } = req.body;

    const student = await Student.findOne({ studentNumber });
    if (!student) return res.status(401).json({ message: "Invalid credentials" });

    const ok = await student.comparePassword(password);
    if (!ok) return res.status(401).json({ message: "Invalid credentials" });

    const token = signToken(student);

    res.cookie("token", token, {
      httpOnly: true,
      secure: NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({
      message: "Logged in",
      user: { id: student._id, studentNumber: student.studentNumber, isAdmin: student.isAdmin },
    });
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

// POST /auth/logout
exports.logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: NODE_ENV === "production",
    sameSite: "lax",
  });
  return res.json({ message: "Logged out" });
};

// GET /auth/me
exports.me = (req, res) => {
  return res.json({ user: req.user });
};
