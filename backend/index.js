//index.js
require('dotenv').config();
const express = require('express');
const {connectToMongoDB} = require('./connect');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());
const PORT = 8000;
const router = require("./router/habits");
const authRouter = require("./router/auth");
const habitLogRouter = require("./router/habitLog");
const { limiter, authLimiter } = require('./middleware/rateLimiter');

connectToMongoDB("mongodb://localhost:27017/habit-tracker").then(() => console.log("DB connected")).catch((err) => console.error(`failed due to ${err}`));
app.use("/habits", limiter, router);
app.use("/auth", limiter, authRouter);
app.use("/habits", limiter, habitLogRouter);
app.listen(PORT, ()=>console.log(`server is running on ${PORT}`));