const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const subjectSchema = new Schema(
    {
        code: {
            type: String,
            required: true,
            unique: true,
        },
        name: {
            type: String,
            required: true,
        },
        credits: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            enum: ["ACTIVE", "INACTIVE"],
            default: "ACTIVE",
        },
    },
    { timestamps: true }
);

module.exports = model("Subject", subjectSchema);