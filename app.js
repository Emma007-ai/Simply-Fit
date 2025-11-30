// ==========================
// Load environment variables
// ==========================
require("dotenv").config();

// ==========================
// Core Modules
// ==========================
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const session = require("express-session");
const passport = require("passport");

// Create express app
const app = express();

// ==========================
// Passport Strategies
// ==========================
require("./config/passport");

// ==========================
// Database Connection
// ==========================
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

// ==========================
// View Engine
// ==========================
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// ==========================
// Middleware
// ==========================
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: process.env.SESSION_SECRET || "supersecretkey",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Make logged-in user available in all views
app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

// ==========================
// Routes
// ==========================

// Home page
app.get("/", (req, res) => {
  res.render("home");
});

// Contact page
app.get("/contact", (req, res) => {
  res.render("contact");
});

// ---------- GOOGLE LOGIN ----------
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login-failed",
    successRedirect: "/"
  })
);

// ---------- GITHUB LOGIN ----------
app.get(
  "/auth/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

app.get(
  "/auth/github/callback",
  passport.authenticate("github", {
    failureRedirect: "/login-failed",
    successRedirect: "/"
  })
);

// ---------- LOGOUT ----------
app.get("/logout", (req, res) => {
  req.logout(() => {
    res.redirect("/");
  });
});

// Workouts CRUD routes
app.use("/workouts", require("./routes/workouts"));

// Auth routes (if you have login pages)
app.use("/auth", require("./routes/auth"));

// ==========================
// Start Server
// ==========================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
