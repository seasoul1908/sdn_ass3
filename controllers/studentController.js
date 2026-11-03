const Attendance = require('../models/attendance');
const Student = require('../models/student');
const mongoose = require('mongoose');
require('../models/class');
const Subject = require("../models/subject");
const getAttendanceStudent = async (req, res) => {
    try {
        const { studentId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(studentId)) {
            return res.status(400).json({
                error: `Invalid studentId: ${studentId}`
            });
        }

        const student = await Student.findById(studentId);

        if (!student) {
            return res.status(404).json({
                error: `Student with id = ${studentId} not found`
            });
        }

        const attendances = await Attendance.find({
            studentId: studentId
        })
            .sort({ date: -1 })
            .populate({
                path: "classId",
                select: "className subjectId",
                populate: {
                    path: "subjectId",
                    model: Subject,
                    select: "subjectName"
                }
            });

        const result = attendances.map(a => ({
            id: a._id.toString(),
            className: a.classId?.className ?? null,
            subjectName: a.classId?.subjectId?.subjectName ?? null,
            date: a.date,
            status: a.status
        }));

        return res.status(200).json(result);

    } catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
};

module.exports = { getAttendanceStudent };

