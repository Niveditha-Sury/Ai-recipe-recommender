const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Signup controller
exports.signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            name: username, // Mapping input username to model name
            email,
            password: hashedPassword,
        });
        await newUser.save();

        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        console.error("SIGNUP ERROR DETAILS:", error);
        res.status(500).json({
            message: "Error creating user",
            error: error.message,
            stack: error.stack
        });
    }
};

// Login controller
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        //check user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        //check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        // Create token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });

        // Create a user object without the password - include ALL fields
        const userData = {
            _id: user._id,
            name: user.name,
            email: user.email,
            profilePic: user.profilePic,
            coverPic: user.coverPic,
            pantry: user.pantry,
            allergies: user.allergies,
            neverShowMe: user.neverShowMe,
            xp: user.xp,
            level: user.level,
            experience: user.experience,
            age: user.age,
            xp: user.xp,
            level: user.level,
            badges: user.badges,
            cookDays: user.cookDays,
        };

        res.json({ token, user: userData });
    } catch (error) {
        res.status(500).json({ message: "Error logging in" });
    }
};
