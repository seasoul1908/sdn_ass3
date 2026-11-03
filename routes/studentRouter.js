const express = require('express');
const router = express.Router();
const { getAttendanceStudent } = require('../controllers/studentController');
const { verifyToken } = require('../controllers/authController');

router.use(verifyToken);
router.get('/:studentId/attendances', getAttendanceStudent);

module.exports = router;
