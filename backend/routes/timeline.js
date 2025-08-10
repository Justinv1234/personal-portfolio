const authMiddleware = require('../middleware/authMiddleware');

module.exports = (pool) => {
    const express = require("express");
    const router = express.Router();

    router.get("/", async (req, res) => {
        try {
            const result = await pool.query("SELECT * FROM timeline_events ORDER BY start_date DESC");
            res.json(result.rows);
        } catch (err) {
            console.error("Error fetching timeline events:", err);
            res.status(500).send("Server error");
        }
    });

    router.get("/:id", async (req, res) => {
        const { id } = req.params;
        try {
            const result = await pool.query("SELECT * FROM timeline_events WHERE id = $1", [id]);
            if (result.rows.length === 0) {
                return res.status(404).json({ error: "Timeline event not found" });
            }
            res.json(result.rows[0]);
        } catch (err) {
            console.error("Error fetching timeline event:", err);
            res.status(500).send("Server error");
        }
    });

    router.post("/", authMiddleware, async (req, res) => {
        const { title, start_date, end_date, position, icon_path, description, event_type } = req.body;
        try {
            const result = await pool.query(
                "INSERT INTO timeline_events (title, start_date, end_date, position, icon_path, description, event_type) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
                [title, start_date, end_date || null, position, icon_path, description, event_type]
            );
            res.status(201).json(result.rows[0]);
        } catch (err) {
            console.error("Error creating timeline event:", err);
            res.status(500).json({ error: "Database error" });
        }
    });

    router.put("/:id", authMiddleware, async (req, res) => {
        const { id } = req.params;
        const { title, start_date, end_date, position, icon_path, description, event_type } = req.body;
        try {
            const result = await pool.query(
                "UPDATE timeline_events SET title = $1, start_date = $2, end_date = $3, position = $4, icon_path = $5, description = $6, event_type = $7 WHERE id = $8 RETURNING *",
                [title, start_date, end_date || null, position, icon_path, description, event_type, id]
            );
            if (result.rows.length === 0) {
                return res.status(404).json({ error: "Timeline event not found" });
            }
            res.json(result.rows[0]);
        } catch (err) {
            console.error("Error updating timeline event:", err);
            res.status(500).json({ error: "Database error" });
        }
    });

    router.delete("/:id", authMiddleware, async (req, res) => {
        const { id } = req.params;
        try {
            const result = await pool.query("DELETE FROM timeline_events WHERE id = $1 RETURNING *", [id]);
            if (result.rows.length === 0) {
                return res.status(404).json({ error: "Timeline event not found" });
            }
            res.status(204).send();
        } catch (err) {
            console.error("Error deleting timeline event:", err);
            res.status(500).json({ error: "Database error" });
        }
    });

    return router;
};