const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const classSchema = new Schema({
    className: { type: String, required: true },

    subjectId: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
    },

    lecturerName: {
        type: String,
        require: true
    },

    status: {
        type: String,
        enum: ["OPEN", "CLOSED"],
        default: "OPEN"
    },

    enrollments: [{
        studentId: {
            type: mongoose.Schema.Types.ObjectId,
            require: true,
            ref: "Student",
        },
        status: {
            type: String,
            enum: ["enrolled", "dropped"],
            default: "enrolled"
        }
    }]

},

    { timestamps: true });
module.exports = model("Class", classSchema);