// ./controllers/habitLog.js
const {HabitLog} = require('../models/habitLog');
const {Habit} = require('../models/habits');

async function log_habit(req, res) {
    const habit = await Habit.findById(req.params.id);
    if(!habit) return res.status(404).json({error: "Habit not found"});
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const existingLog = await HabitLog.findOne({habitId: req.params.id, userId: req.user.userId, date: {$gte: today, $lt: tomorrow,}});
    
    if(existingLog) return res.status(400).json({message: "Habit already logged"});

    const log = await HabitLog.create({
        habitId: req.params.id,
        completed: true,
        date: new Date(),
        userId: req.user.userId,
    });

    return res.status(201).json(log);
}

async function get_all_logs_by_id(req, res) {
    const habit = await Habit.findOne({_id: req.params.id, userId: req.user.userId});
    if(!habit) return res.status(404).json({message: `Habit with id ${req.params.id} not found`});
    const logs = await HabitLog.find({habitId: req.params.id, userId: req.user.userId});
    return res.json(logs);
}

async function get_streak_by_id(req, res) {
    const habit = await Habit.findOne({_id: req.params.id, userId: req.user.userId});
    if(!habit) return res.status(404).json({message: "Habit not found"});
    
    const logs = await HabitLog.find({habitId: req.params.id, userId: req.user.userId});
    logs.sort((a, b) => a.date - b.date);
    
    if(logs.length === 0) {
        return res.json({"current streak": 0, "max streak": 0});
    }

    let curr_streak = 1;
    let max_streak = 1;
    let prev_date = logs[0].date;

    for(let i = 1; i < logs.length; i++) {
        const curr_date = logs[i].date;
        const diffDays = Math.round((curr_date - prev_date) / (1000 * 60 * 60 * 24));

        if(diffDays === 0) continue;
        else if(diffDays === 1) curr_streak++;
        else {
            max_streak = Math.max(max_streak, curr_streak);
            curr_streak = 1;
        }
        prev_date = curr_date;
    }
    max_streak = Math.max(max_streak, curr_streak);

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    const lastLogDay = new Date(logs[logs.length - 1].date);
    lastLogDay.setHours(0, 0, 0, 0);

    if(lastLogDay < yesterday) curr_streak = 0;

    return res.json({"current streak": curr_streak, "max streak": max_streak});
}

module.exports = {
    log_habit,
    get_all_logs_by_id,
    get_streak_by_id,
}