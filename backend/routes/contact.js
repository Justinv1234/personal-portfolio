const authMiddleware = require('../middleware/authMiddleware');

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

    router.get("/", authMiddleware, async (req, res) => {
        try {
            const result = await pool.query("SELECT * FROM contacts ORDER BY submitted_at DESC");
            res.json(result.rows);
        } catch (err) {
            console.error("Error fetching contacts:", err);
            res.status(500).send("Server error");
        }
    });

    router.delete("/:id", authMiddleware, async (req, res) => {
        const { id } = req.params;
        try {
            const result = await pool.query("DELETE FROM contacts WHERE id = $1 RETURNING *", [id]);
            if (result.rows.length === 0) {
                return res.status(404).json({ error: "Contact not found" });
            }
            res.status(204).send();
        } catch (err) {
            console.error("Error deleting contact:", err);
            res.status(500).json({ error: "Database error" });
        }
    });


    return router;
};