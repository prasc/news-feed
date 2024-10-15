const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5001;

// Enable CORS
app.use(
  cors({
    origin: 'http://localhost:3000', // Replace with your frontend's URL
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  })
);

// MongoDB connection
mongoose
  .connect('mongodb://127.0.0.1:27017/newsfeed', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Middleware
app.use(express.json());

// Session middleware
app.use(
  session({
    secret: 'mySecret',
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Passport configuration for Google OAuth
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID, // Replace with your actual Google Client ID
      clientSecret: process.env.GOOGLE_CLIENT_SECRET, // Replace with your actual Google Client Secret
      callbackURL: 'http://localhost:5001/auth/google/callback', // Your callback URL
    },
    (accessToken, refreshToken, profile, done) => {
      // Here you would normally find or create the user in your database
      return done(null, profile);
    }
  )
);

// Serialize user into session
passport.serializeUser((user, done) => {
  done(null, user);
});

// Deserialize user from session
passport.deserializeUser((obj, done) => {
  done(null, obj);
});

// Routers
const postsRoute = require('./routes/posts');
const authRoute = require('./routes/authRoute'); // Create this route file for OAuth
app.use('/api', postsRoute);
app.use('/auth', authRoute); // Use the auth route

// Root route to handle '/'
app.get('/', (req, res) => {
  res.send('Welcome to the Newsfeed API!');
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
