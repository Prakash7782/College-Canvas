const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require("../Models/User");
const { OAuth2Client } = require('google-auth-library');

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID); // Google client

// Signup for traditional user
const signup = async (req, res) => {
    try {
        const { name, email, password, userType } = req.body;
        const user = await UserModel.findOne({ email });
        if (user) {
            return res.status(409)
                .json({ message: 'User already exists, you can login', success: false });
        }
        const userModel = new UserModel({ name, email, password, userType });
        userModel.password = await bcrypt.hash(password, 10); // Hashing the password
        await userModel.save();
        res.status(201)
            .json({
                message: "Signup successful",
                success: true
            })
    } catch (err) {
        res.status(500)
            .json({
                message: "Internal server error",
                success: false
            })
    }
};

// Login for traditional user
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        const errorMsg = 'Auth failed: email or password is wrong';
        if (!user) {
            return res.status(403)
                .json({ message: errorMsg, success: false });
        }
        const isPassEqual = await bcrypt.compare(password, user.password);
        if (!isPassEqual) {
            return res.status(403)
                .json({ message: errorMsg, success: false });
        }
        // Generating JWT token
        const jwtToken = jwt.sign(
            { email: user.email, _id: user._id, userType: user.userType },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        // Respond with token and user details
        res.status(200)
            .json({
                message: "Login Success",
                success: true,
                jwtToken,
                email,
                name: user.name,
                userType: user.userType 
            });
    } catch (err) {
        res.status(500)
            .json({
                message: "Internal server error",
                success: false
            });
    }
};

// Google login or signup
const googleLogin = async (req, res) => {
    const { credential } = req.body;  // The ID token from Google
    try {
        const ticket = await googleClient.verifyIdToken({
            idToken: credential,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        const payload = ticket.getPayload();
        const { email, name } = payload;

        // Check if user exists in the database
        let user = await UserModel.findOne({ email });

        // If user doesn't exist, create a new user (since Google login doesn't require a password)
        if (!user) {
            user = new UserModel({
                name,
                email,
                password: null,  // No password for Google sign-in
                userType: 'user', // You can set a default or modify based on your logic
            });
            await user.save();
        }

        // Generate JWT token for the user
        const jwtToken = jwt.sign(
            { email: user.email, _id: user._id, userType: user.userType },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        // Respond with token and user details
        res.status(200)
            .json({
                message: "Google login successful",
                success: true,
                jwtToken,
                email: user.email,
                name: user.name,
                userType: user.userType 
            });

    } catch (err) {
        res.status(500)
            .json({
                message: "Error verifying Google token",
                success: false,
                error: err.message,
            });
    }
};

module.exports = {
    signup,
    login,
    googleLogin
};
