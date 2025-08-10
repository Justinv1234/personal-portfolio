const authMiddleware = require('../middleware/authMiddleware');

module.exports = (pool) => {
    const express = require("express");
    const router = express.Router();

    const slugify = (text) =>
        text
            .toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[^\w-]+/g, "");

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
            const result = await pool.query("SELECT * FROM projects WHERE slug = $1", [slug]);

            if (result.rows.length === 0) {
                return res.status(404).json({ error: "Project not found" });
            }

            res.json(result.rows[0]);
        } catch (err) {
            console.error("Error fetching project by slug:", err);
            res.status(500).json({ error: "Server error" });
        }
    });

    router.post("/", authMiddleware, async (req, res) => {
        const { title, description, long_description, website_url, image_urls, tags, is_featured } = req.body;
        const slug = slugify(title);

        try {
            const result = await pool.query(
                "INSERT INTO projects (title, slug, description, long_description, website_url, image_urls, tags, is_featured) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
                [title, slug, description, long_description, website_url, image_urls, tags, is_featured]
            );
            res.status(201).json(result.rows[0]);
        } catch (err) {
            console.error("Error creating project:", err);
            res.status(500).json({ error: "Database error" });
        }
    });

    router.put("/:id", authMiddleware, async (req, res) => {
        const { id } = req.params;
        const { title, description, long_description, website_url, image_urls, tags, is_featured } = req.body;
        const slug = slugify(title);

        try {
            const result = await pool.query(
                "UPDATE projects SET title = $1, slug = $2, description = $3, long_description = $4, website_url = $5, image_urls = $6, tags = $7, is_featured = $8 WHERE id = $9 RETURNING *",
                [title, slug, description, long_description, website_url, image_urls, tags, is_featured, id]
            );

            if (result.rows.length === 0) {
                return res.status(404).json({ error: "Project not found" });
            }

            res.json(result.rows[0]);
        } catch (err) {
            console.error("Error updating project:", err);
            res.status(500).json({ error: "Database error" });
        }
    });

    router.delete("/:id", authMiddleware, async (req, res) => {
        const { id } = req.params;

        try {
            const result = await pool.query("DELETE FROM projects WHERE id = $1 RETURNING *", [id]);

            if (result.rows.length === 0) {
                return res.status(404).json({ error: "Project not found" });
            }

            res.status(204).send();
        } catch (err) {
            console.error("Error deleting project:", err);
            res.status(500).json({ error: "Database error" });
        }
    });

    return router;
};