const jwt = require('jsonwebtoken');
require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    throw new Error("Missing JWT_SECRET in .env");
}
const users = [{ email: 'he191393@fpt.edu.vn', password: 'he191393@123' }];

const login = async (req, res) => {
    const { email, password } = req.body || {};
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) {
        console.log("Login faile");
        return res.status(401).json({
            message: "Invalid email or password",
        });
    }
    //tao token
    const token = jwt.sign({
        role: user.role
    }, JWT_SECRET, {
        subject: String(user.id),
        expiresIn: "1h",
    });
    console.log("JWT Created");
    return res.json({
        message: "Login successfull",

        accessToken: token,
    });
};

function verifyToken(req, res, next) {
    const authHeader = req.headers.authorization;
    //kiem tra header
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        console.log("Missing token");
        return res.status(401).json({
            message: "Access token require"
        });
    }
    //lay token tu header
    const token = authHeader.slice("Bearer ".length);
    try {
        const payload = jwt.verify(token, JWT_SECRET);
        //luu thong tin xac minh de router su dung
        req.user = {
            id: payload.sub,
            role: payload.role
        };
        console.log("Token valid: ", req.user.id);
        next();
    }
    catch (error) {
        console.log("Token Invalid: ");
        return res.status(401).json({
            message: "Invalid or expired token"
        });
    }
}

module.exports = { login, verifyToken }