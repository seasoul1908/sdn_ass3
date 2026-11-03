const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const attendanceSchema = new Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "Student",
    },
    classId: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "Class",
    },
    date: {
        type: Date,
        require: true,
    },
    status: {
        type: String,
        enum: ["PRESENT", "ABSENT"],
        default: "ABSENT",
    }

})
module.exports = model("Attendance", attendanceSchema);