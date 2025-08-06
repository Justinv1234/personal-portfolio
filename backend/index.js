// index.js
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
const experienceRoute = require("./routes/experience")(pool);
const educationRoute = require("./routes/education")(pool);
const contactRoute = require("./routes/contact")(pool);

app.use("/api/projects", projectsRoute);
app.use("/api/experience", experienceRoute);
app.use("/api/education", educationRoute);
app.use("/api/contact", contactRoute);

app.listen(3000, () => {
    console.log("Server is running at http://localhost:3000");
});