// ./models/habits.js
const mongoose = require('mongoose');

const habitSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        frequency: {
            type: String,
            enum: ['daily', 'weekly'],
            default: 'daily',
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
        }
    },
    { timestamps: true }
);


const Habit = mongoose.model('habit', habitSchema);
module.exports = {
    Habit,
}