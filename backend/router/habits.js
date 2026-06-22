// ./router/habit.js
const express = require('express');
const router = express.Router();
const { create_habit, get_habit_by_id, update_habit_by_id, delete_habit_by_id, get_all_habits} = require("../controllers/habits");
const { verify_token } = require("../middleware/auth");

router.post("/", verify_token, create_habit);
router.get("/", verify_token, get_all_habits);
router.get("/:id", verify_token, get_habit_by_id);
router.put("/:id", verify_token, update_habit_by_id);
router.delete("/:id", verify_token, delete_habit_by_id);

module.exports = router;