// routes/authRoute.js
const express = require('express');
const passport = require('passport');
const router = express.Router();

// Route to start the Google OAuth flow
router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  })
);

// Google OAuth callback route
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    // Save the user's profile information (if needed) or handle session here
    // Then, redirect to the frontend after successful authentication
    res.redirect('http://localhost:3000/newsfeed');
  }
);

// Route to check authentication status
router.get('/status', (req, res) => {
  if (req.isAuthenticated()) {
    // Send user info back to the client if authenticated
    res.status(200).json({ user: req.user });
  } else {
    // Send a 401 (Unauthorized) response if the user is not authenticated
    res.status(401).json({ message: 'Not authentication' });
  }
});

// Logout route
router.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err); // Pass the error to the error-handling middleware
    }
    // Clear the session or other related tokens (if you're using a session store)
    req.session.destroy((err) => {
      if (err) return next(err);
      res.redirect('http://localhost:3000/'); // Redirect to the homepage
    });
  });
});

module.exports = router;
