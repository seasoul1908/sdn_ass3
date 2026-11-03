const express = require('express');
const router = express.Router();
const { verifyToken } = require('../controllers/authController')
const { getAllStudentsInClass, getAttendanceSummary } = require('../controllers/classController')

router.use(verifyToken);
router.get("/:classId/students", getAllStudentsInClass);
router.get("/:classId/attendance-summary", getAttendanceSummary);

module.exports = router;