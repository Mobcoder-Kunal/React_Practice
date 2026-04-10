import express from "express";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";
import { User } from "../models/user";

const router = express.Router()

// Register
router.post("/register", async (req, res) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await User.create({
        email,
        password: hashedPassword,
    })

    res.json({ message: "User created", user });
})

// Login
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return res.status(400).json({ message: "Invalid password" });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, { expiresIn: "1d" })

    res.json({ 
        message: "Login successful",
        token,
    })
})

export default router