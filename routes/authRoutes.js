const express = require("express");
const bcrypt = require("bcryptjs");
const pool = require("../db/pool");

const router = express.Router();

// Register Route
router.post("/register", async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const query = "INSERT INTO users (username, email, password) VALUES ($1, $2, $3)";
        await pool.query(query, [username, email, hashedPassword]);
        res.json({ success: true, message: "User registered successfully!" });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Error registering user" });
    }
});

// Login Route
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        if (result.rows.length > 0) {
            const user = result.rows[0];
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (isPasswordValid) {
                res.json({ success: true, message: "Login successful!" });
            } else {
                res.json({ success: false, message: "Invalid credentials" });
            }
        } else {
            res.json({ success: false, message: "User not found" });
        }
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Error logging in" });
    }
});

module.exports = router;
