    //. /router/habitLog.js
    const express = require('express');
    const router = express.Router();
    const {log_habit, get_all_logs_by_id, get_streak_by_id} = require("../controllers/habitLog");
    const { verify_token } = require("../middleware/auth");

    router.post("/:id/log", verify_token, log_habit);
    router.get("/:id/logs", verify_token, get_all_logs_by_id);
    router.get("/:id/streak", verify_token, get_streak_by_id);

    module.exports = router;