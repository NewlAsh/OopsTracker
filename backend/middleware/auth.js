// ./middleware/auth.js
const jwt = require("jsonwebtoken");

function verify_token(req, res, next) {
    const authHeader = req.headers["authorization"];
    if(!authHeader) return res.status(400).json({message: "Access denied, no token"});
    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch(error) {
        return res.status(401).json({error: "Invalid Token"});
    }
}

module.exports = {verify_token};