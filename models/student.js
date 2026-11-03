const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const studentSchema = new Schema({
    studentCode: {
        type: String,
        require: true,
    },
    fullName: { type: String, required: true },

    email: { type: String, required: true, unique: true },

},

    { timestamps: true });
module.exports = model("Student", studentSchema);