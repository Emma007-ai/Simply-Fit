
// ==============================
// SIMPLY FIT - MAIN SERVER FILE
// ==============================

// Load environment variables securely
require("dotenv").config();

// Basic dependencies
const express = require("express");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const path = require("path");

const app = express();

// Connect to MongoDB Atlas
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

// Set EJS as template engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware for form data
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// Serve public folder (CSS, images, etc.)
app.use(express.static(path.join(__dirname, "public")));

// Home page
app.get("/", (req, res) => {
  res.render("home");
});

// Contact page
app.get("/contact", (req, res) => {
  res.render("contact");
});

// Workouts routes
const workoutRoutes = require("./routes/workouts");
app.use("/workouts", workoutRoutes);

// Start server
app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
