//index.js
require('dotenv').config();
const express = require('express');
const {connectToMongoDB} = require('./connect');
const cors = require('cors');
const app = express();
app.use(express.json());

const allowedOrigins = [
    "http://localhost:5500",
    "http://127.0.0.1:5500",
    "http://localhost:3000",
    process.env.FRONTEND_URL, 
].filter(Boolean);
 
app.use(cors({
    origin: function (origin, callback) {
        // allow requests with no origin (mobile apps, curl, Postman)
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) return callback(null, true);
        return callback(new Error(`CORS blocked: ${origin}`));
    },
    credentials: true,
}));
const PORT = process.env.PORT;
const router = require("./router/habits");
const authRouter = require("./router/auth");
const habitLogRouter = require("./router/habitLog");
const { limiter, authLimiter } = require('./middleware/rateLimiter');

connectToMongoDB(process.env.MONGODB_URI).then(() => console.log("DB connected")).catch((err) => console.error(`failed due to ${err}`));
app.use("/habits", limiter, router);
app.use("/auth", limiter, authRouter);
app.use("/habits", limiter, habitLogRouter);
app.listen(PORT, ()=>console.log(`server is running on ${PORT}`));
