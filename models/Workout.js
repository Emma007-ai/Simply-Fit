// Workout Model - Defines the structure of a workout document

const mongoose = require("mongoose");

const workoutSchema = new mongoose.Schema({
  name: String,        // Exercise name
  category: String,    // Type of exercise
  duration: Number,    // Minutes
  reps: Number,        // Number of reps
  sets: Number,        // Number of sets
  notes: String,       // Optional notes
  date: {
    type: Date,
    default: Date.now // Defaults to today
  }
});

module.exports = mongoose.model("Workout", workoutSchema);
