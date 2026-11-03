const Class = require('../models/class');
const mongoose = require('mongoose');
require("../models/student");
const Attendance = require("../models/attendance");
const getAllStudentsInClass = async (req, res) => {
    try {
        const { classId } = req.params;
        if (!mongoose.Types.ObjectId.isValid(classId)) {
            return res.status(400).json({ error: `Invalid classId: ${classId}` });
        }
        const { status } = req.query;
        const classes = await Class.findById(classId).populate('enrollments.studentId');
        if (!classes) {
            return res.status(404).json({ error: `Class with id = ${classId} not found` });
        }
        let students = classes.enrollments;
        if (status === "enrolled" || status === "dropped") {
            students = students.filter(student => student.status === status);
        } else {
            return res.status(400).json({ error: `Invalid status: ${status}` });
        }
        const result = students.map(item => ({
            id: item.studentId?._id,
            studentCode: item.studentId?.studentCode,
            fullName: item.studentId?.fullName,
            email: item.studentId?.email
        }));
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const getAttendanceSummary = async (req, res) => {
    try {
        const { classId } = req.params;
        if (!mongoose.Types.ObjectId.isValid(classId)) {
            return res.status(400).json({ error: `Invalid classId: ${classId}` });
        }

        const targetClass = await Class.findById(classId).populate("enrollments.studentId");
        if (!targetClass) {
            return res.status(404).json({ error: `Class with id = ${classId} not found` })
        }

        let students = targetClass.enrollments.filter(
            e => e.status?.toLowerCase() === "enrolled"
        );

        const studentsId = students.map(
            s => s.studentId?._id
        );

        const attendances = await Attendance.find({
            classId: classId,
            studentId: { $in: studentsId }
        })


        const result = students.map(item => {
            const student = item.studentId;
            const records = attendances.filter(
                item => item.studentId.toString() === student._id.toString()
            );

            const totalSession = records.length;
            const present = records.filter(item => item.status === "PRESENT").length;
            const absent = records.filter(item => item.status === "ABSENT").length;
            const presentRate = totalSession > 0 ? ((present / totalSession) * 100).toFixed(1) : 0;
            return {
                studentCode: item.studentId?.studentCode,
                fullName: item.studentId?.fullName,
                totalSessions: totalSession,
                present: present,
                absent: absent,
                attendanceRate: presentRate,
                warning: presentRate < 80
            }
        })
        res.status(200).json(result)
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

module.exports = { getAllStudentsInClass, getAttendanceSummary }
