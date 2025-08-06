module.exports = (pool) => {
    const express = require("express");
    const router = express.Router();

    router.post("/", async (req, res) => {
        const { name, email, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({ error: "All fields are required" });
        }

        try {
            await pool.query(
                "INSERT INTO contacts (name, email, message) VALUES ($1, $2, $3)",
                [name, email, message]
            );
            res.status(201).json({ message: "Message received!" });
        } catch (err) {
            console.error("Error inserting contact:", err);
            res.status(500).json({ error: "Database error" });
        }
    });

    return router;
};