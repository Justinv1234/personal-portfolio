module.exports = (pool) => {
    const express = require("express");
    const router = express.Router();

    router.get("/", async (req, res) => {
        try {
            const result = await pool.query("SELECT * FROM experience");
            res.json(result.rows);
        } catch (err) {
            console.error("Error fetching experience:", err);
            res.status(500).send("Server error");
        }
    });

    return router;
};