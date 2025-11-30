// ==============================
// SIMPLY FIT - WORKOUT ROUTES
// Handles all CRUD operations
// ==============================

const express = require("express");
const router = express.Router();
const Workout = require("../models/Workout");

// Middleware: protect routes (only logged-in users can CRUD)
function requireLogin(req, res, next) {
  if (!req.isAuthenticated || !req.isAuthenticated()) {
    return res.redirect("/login-required");
  }
  next();
}

// ==============================
// READ: List all workouts (PUBLIC)
// ==============================
router.get("/", async (req, res) => {
  const workouts = await Workout.find().sort({ date: -1 });
  res.render("workouts/index", { workouts });
});

// ==============================
// CREATE: New form (PROTECTED)
// ==============================
router.get("/new", requireLogin, (req, res) => {
  res.render("workouts/new");
});

// ==============================
// CREATE: Save new workout (PROTECTED)
// ==============================
router.post("/", requireLogin, async (req, res) => {
  await Workout.create(req.body);
  res.redirect("/workouts");
});

// ==============================
// READ: Show a single workout (PUBLIC)
// ==============================
router.get("/:id", async (req, res) => {
  const workout = await Workout.findById(req.params.id);
  res.render("workouts/show", { workout });
});

// ==============================
// UPDATE: Edit form (PROTECTED)
// ==============================
router.get("/:id/edit", requireLogin, async (req, res) => {
  const workout = await Workout.findById(req.params.id);
  res.render("workouts/edit", { workout });
});

// ==============================
// UPDATE: Save updated workout (PROTECTED)
// ==============================
router.put("/:id", requireLogin, async (req, res) => {
  await Workout.findByIdAndUpdate(req.params.id, req.body);
  res.redirect(`/workouts/${req.params.id}`);
});

// ==============================
// DELETE: Remove workout (PROTECTED)
// ==============================
router.delete("/:id", requireLogin, async (req, res) => {
  await Workout.findByIdAndDelete(req.params.id);
  res.redirect("/workouts");
});

module.exports = router;
