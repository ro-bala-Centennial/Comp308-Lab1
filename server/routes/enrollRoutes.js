const router = require("express").Router();
const enroll = require("../controllers/enrollController");
const requireAuth = require("../middleware/requireAuth");

router.post("/add", requireAuth, enroll.addCourse);
router.put("/update", requireAuth, enroll.updateCourseSection);
router.post("/drop", requireAuth, enroll.dropCourse);
router.get("/my-courses", requireAuth, enroll.myCourses);

module.exports = router;
