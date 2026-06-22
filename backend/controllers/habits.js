// ./controllers/habits.js

const {Habit} = require("../models/habits");
const {User} = require("../models/user");

async function create_habit(req, res) {
   const { name, description, frequency } = req.body;
    if(!name) return res.status(400).json({error: "Your lazy ahh can't leave the 'habit' section empty!"});
    if(!frequency) return res.status(400).json({error: "enter the frequency you son of a bitch"});
    const habit = await Habit.create({name, description, frequency, userId: req.user.userId});
    return res.status(201).json(habit);
}

async function get_all_habits(req, res) {
    const habits = await Habit.find({userId: req.user.userId});
    return res.json(habits);
}

async function get_habit_by_id(req, res) {
    const habit = await Habit.findOne({_id: req.params.id, userId: req.user.userId});
    if(!habit) return res.status(404).json({error: `Habit by ${req.params.id} not found`});
    return res.json(habit);
}

async function update_habit_by_id(req, res) {
    const habit = await Habit.findOneAndUpdate({_id: req.params.id, userId: req.user.userId}, req.body, {new: true});
    if(!habit) return res.status(404).json({error: `no such Habit by id ${req.params.id} not found`});
    return res.json(habit);
}

async function delete_habit_by_id(req, res) {
    const habit = await Habit.findByIdAndDelete({_id: req.params.id, userId: req.user.userId});
    if(!habit) return res.status(404).json({error: `no such habit by id ${req.params.id} not found`});
    return res.json({message: "Habit deleted successfully"});
}

module.exports = {
    create_habit,
    get_habit_by_id,
    update_habit_by_id,
    delete_habit_by_id,
    get_all_habits,
};



// const habitSchema = new mongoose.Schema(
//     {
//         name: {
//             type: String,
//             required: true,
//         },
//         description: {
//             type: String,
//         },
//         frequency: {
//             type: String,
//             enum: ['daily', 'weekly'],
//             default: 'daily',
//         },
//     },
//     { timestamps: true }
// );