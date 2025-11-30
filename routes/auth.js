const express = require('express');
const passport = require('passport');
const router = express.Router();

// Google login
router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

// Google callback
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    successRedirect: "/workouts"
  })
);

module.exports = router;
