// ./controllers/auth.js
const {User} = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function register_user(req, res) {
    const {name, email, password} = req.body;
    if (!email || !name || !password) return res.status(400).json({ error: "All fields required" });
    const existing_user = await User.findOne({email});
    if(existing_user) return res.status(400).json({error: "user exists already"});

    const salt = await bcrypt.genSalt(10);
    const hashed_password = await bcrypt.hash(password, salt);

    const new_user = await User.create({email: email, name: name, password: hashed_password});
    return res.json({
        message: "user registered",
        userId: new_user._id,
    });
}

async function login_user(req, res) {
    const {email, password} = req.body;
    try {
        if (!email || !password) return res.status(400).json({ error: "All fields required" });
        const existing_user = await User.findOne({email});
        if(!existing_user) return res.status(400).json({error: "Invalid email or password"});
        const match_password = await bcrypt.compare(password, existing_user.password);
        if(!match_password)return res.status(400).json({message: "Invalid email or password"});

        const token = jwt.sign(
            { userId: existing_user._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        return res.status(200).json({message: "Login successfull", token});
    }
    catch(error) {
        return res.status(500).json({ error: error.message });
    }
}


module.exports = {
    register_user,
    login_user,
}