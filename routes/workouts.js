// ==============================
// SIMPLY FIT - WORKOUT ROUTES
// Handles all CRUD operations
// ==============================

const express = require("express");
const router = express.Router();
const Workout = require("../models/Workout");

// READ: List all workouts
router.get("/", async (req, res) => {
  const workouts = await Workout.find().sort({ date: -1 });
  res.render("workouts/index", { workouts });
});

// CREATE: Form page
router.get("/new", (req, res) => {
  res.render("workouts/new");
});

// CREATE: Create workout in DB
router.post("/", async (req, res) => {
  await Workout.create(req.body);
  res.redirect("/workouts");
});

// READ: Show single workout
router.get("/:id", async (req, res) => {
  const workout = await Workout.findById(req.params.id);
  res.render("workouts/show", { workout });
});

// UPDATE: Edit form
router.get("/:id/edit", async (req, res) => {
  const workout = await Workout.findById(req.params.id);
  res.render("workouts/edit", { workout });
});

// UPDATE: Save updated workout
router.put("/:id", async (req, res) => {
  await Workout.findByIdAndUpdate(req.params.id, req.body);
  res.redirect(`/workouts/${req.params.id}`);
});

// DELETE: Remove workout
router.delete("/:id", async (req, res) => {
  await Workout.findByIdAndDelete(req.params.id);
  res.redirect("/workouts");
});

module.exports = router;
