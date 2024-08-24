const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../Models/userModel');

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "All fields are mandatory" });
    }
    
    try {
        const user = await User.findOne({ email });

        if (user && await bcrypt.compare(password, user.password)) {
            // Generate JWT token
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            return res.status(200).json({
                message: "Login successful",
                token
            });
        } else {
            return res.status(400).json({ message: "Invalid credentials" });
        }
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};

const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are mandatory" });
    }

    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "Email already registered" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashedPassword });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        return res.status(201).json({ 
            message: "User created successfully", 
            token 
        });
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};
module.exports={loginUser,registerUser}