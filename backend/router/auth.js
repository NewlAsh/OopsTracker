// ./router/auth.js
const express = require("express");
const router = express.Router();
const {login_user, register_user} = require("../controllers/auth");
const { authLimiter } = require('../middleware/rateLimiter');


router.post("/register", authLimiter, register_user);
router.post("/login", authLimiter, login_user);

module.exports = router;