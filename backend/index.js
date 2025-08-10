const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// PostgreSQL pool
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,
    },
});

// Routes
const projectsRoute = require("./routes/projects")(pool);
const timelineRoute = require("./routes/timeline")(pool);
const contactRoute = require("./routes/contact")(pool);
const authRoute = require("./routes/auth")(pool);

app.use("/api/projects", projectsRoute);
app.use("/api/timeline", timelineRoute);
app.use("/api/contact", contactRoute);
app.use("/api/auth", authRoute);

module.exports = app;

if (process.env.NODE_ENV !== 'production') {
    app.listen(3000, () => {
        console.log("Server is running at http://localhost:3000");
    });
}