const router = require("express").Router();
const course = require("../controllers/courseController");
const requireAuth = require("../middleware/requireAuth");
const requireAdmin = require("../middleware/requireAdmin");

// Anyone logged in can list courses
router.get("/", requireAuth, course.listCourses);

// Admin can create/update/delete
router.post("/", requireAuth, requireAdmin, course.createCourse);
router.put("/:id", requireAuth, requireAdmin, course.updateCourse);
router.delete("/:id", requireAuth, requireAdmin, course.deleteCourse);

// Admin query: students in course
router.get("/:id/students", requireAuth, requireAdmin, course.listStudentsInCourse);

module.exports = router;
