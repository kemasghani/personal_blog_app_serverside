const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
require('dotenv').config();

// Register a new user
exports.registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        // Hash the password before saving it to the database
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ username, email, password: hashedPassword });
        res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Error registering user' });
    }
};

// Login user
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid password' });
        }
        // Generate JWT token for authentication
        const token = jwt.sign({ id: user.id, email: user.email }, process.env.SECRET_KEY, { expiresIn: '1h' });
        res.status(200).json({ message: 'Login successful', token, userId: user.id });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ error: 'Error logging in' });
    }
};
