module.exports = (pool) => {
    const express = require("express");
    const router = express.Router();

    router.get("/", async (req, res) => {
        try {
            const result = await pool.query("SELECT * FROM projects");
            res.json(result.rows);
        } catch (err) {
            console.error("Error fetching projects:", err);
            res.status(500).send("Server error");
        }
    });

    router.get("/:slug", async (req, res) => {
        const { slug } = req.params;

        try {
            const result = await pool.query("SELECT * FROM projects");
            const projects = result.rows;

            const matchedProject = projects.find((project) => {
                const generatedSlug = project.title
                    .toLowerCase()
                    .replace(/\s+/g, "-")
                    .replace(/[^\w-]+/g, "");
                return generatedSlug === slug;
            });

            if (!matchedProject) {
                return res.status(404).json({ error: "Project not found" });
            }

            res.json(matchedProject);
        } catch (err) {
            console.error("Error fetching project by slug:", err);
            res.status(500).json({ error: "Server error" });
        }
    });

    return router;
};