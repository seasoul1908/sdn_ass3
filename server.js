require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const connectDB = require("./config/db");

const authRouter = require('./routes/authRouter');
const classRouter = require("./routes/classRouter");
const studentRouter = require("./routes/studentRouter");

app.use(express.json());

// Routes
app.use('/api/auth', authRouter);
app.use("/api/classes", classRouter);
app.use("/api/students", studentRouter);

const startServer = async () => {
    await connectDB();
    app.get('/', async (req, res) => {
        try {
            res.status(200).send({ message: 'Welcome to Practical Exam!' });
        } catch (error) {
            res.send({ error: error.message });
        }
    });
    const PORT = process.env.PORT || 9999;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};

startServer();
