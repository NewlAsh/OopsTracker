// ./models/habitLog.js
const mongoose = require('mongoose');
const {Habit} = require('./habits');
const {User} = require('./user');

const habitLogSchema = new mongoose.Schema({
    habitId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'habit',
        required: true,
    },
    completed: {
        type: Boolean,
        default: false,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    }
});


const HabitLog = mongoose.model('habitLog', habitLogSchema);
module.exports = { HabitLog };