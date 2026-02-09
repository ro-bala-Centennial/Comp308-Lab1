const router = require("express").Router();
const student = require("../controllers/studentController");
const requireAuth = require("../middleware/requireAuth");
const requireAdmin = require("../middleware/requireAdmin");

// admin-only
router.post("/", requireAuth, requireAdmin, student.createStudent);
router.get("/", requireAuth, requireAdmin, student.listStudents);

module.exports = router;
